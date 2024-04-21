import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../../../../config/firebase.config";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import "firebase/firestore";

import firebase from "firebase/app";


interface Receiver {
  uid: string;
  providerData: {
    photoURL: string | null;
    providerId: string;
    displayName: string;
    email: string;
    phoneNumber: string | null;
  };
}

interface LastMessage {
  chatId: string;
  lastMessageData: {
    message: string;
    receiver: Receiver;
    senderUID: string;
    status: string;
    timeStamp: {
      seconds: number;
      nanoseconds: number;
    };
    uid: string;
  };
}

const MessageCard = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const data = useSelector((state: any) => {
    return state.userAuth;
  });

  const [user, setUser] = useState(data);
  const [lastMessages, setLastMessages] = useState<LastMessage[]>([]);

  const handleChatNavigation = ({ item }: { item: LastMessage }) => {
    const data = {
      providerData: {
        displayName: user?.providerData?.displayName,
        email: user?.providerData?.email,
        phoneNumber: user?.providerData?.phoneNumber,
        photoURL: user?.providerData?.photoURL,
        providerId: user?.providerData?.providerId,
        uid: user?.providerData?.uid,
      },
      uid: user?.uid,
    };

    // console.log(item.lastMessageData.receiver)

    navigation.navigate("ChatScreen", {
      sender: data,
      receiver: item?.lastMessageData?.receiver,
    });
  };

  // Render function for each item in the list
  const renderItem = ({ item }: { item: any }) => {
    // Get the timestamp of the last message
    const lastMessageTimestamp =
      item?.lastMessageData?.timeStamp?.seconds * 1000;

    // Get the current date
    const currentDate = new Date();

    // Convert the last message timestamp to a Date object
    const lastMessageDate = new Date(lastMessageTimestamp);

    // Check if the last message was sent today
    const isToday =
      lastMessageDate.getDate() === currentDate.getDate() &&
      lastMessageDate.getMonth() === currentDate.getMonth() &&
      lastMessageDate.getFullYear() === currentDate.getFullYear();

    // Format the time based on whether the last message was sent today or not
    const formattedTime = isToday
      ? new Date(lastMessageTimestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : new Date(lastMessageTimestamp).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

    const receiverName =
      item.lastMessageData.receiver.uid != user.uid
        ? item?.lastMessageData?.receiver?.providerData?.displayName
        : item?.lastMessageData?.sender?.providerData?.displayName;

    const pic =
      item.lastMessageData.receiver.uid != user.uid
        ? item?.lastMessageData?.receiver?.providerData?.photoURL
        : item?.lastMessageData?.sender?.providerData?.photoURL;
    return (
      <TouchableOpacity
        className="mb-2  w-full  justify-between"
        style={{ flexDirection: "row" }}
        onPress={() => handleChatNavigation({ item })}
      >
        <View className="p-2  flex-row w-[80%]">
          {pic != null ? (
            <Image
              className="rounded-full w-[40px] h-[40px]"
              source={{
                uri: pic,
              }}
            />
          ) : (
            <View className="bg-[#F4F185] rounded-full w-[40px] h-[40px] items-center justify-center ">
              <Text className="text-center font-[Manrope-Medium]">
                {receiverName
                  .split(" ")
                  .map((word: any) => word[0].toUpperCase())
                  .join("")}
              </Text>
            </View>
          )}
          <View className=" ml-2">
            <Text className=" font-[Manrope-Bold]">
              {/* {item?.lastMessageData?.receiver?.providerData?.displayName} */}
              {receiverName}
            </Text>
            <Text className=" font-[Manrope-ExtraLight] text-[10px]">
              {item?.lastMessageData?.message}
            </Text>
          </View>
        </View>
        <View className=" items-end  w-[20%] items-center justify-center">
          <Text className="font-[Manrope-ExtraLight] text-[10px] text-slate-500">
            {formattedTime}
          </Text>
          <Text className="font-[Manrope-Medium]">{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadLastMessages = async () => {
    try {
      let msgQuery: Query<DocumentData, DocumentData> | undefined;
  
      // Query directMessages where the current user is the sender
      const senderMsgQuery = query(
        collection(firestoreDB, "directMessages"),
        where("participants.sender.uid", "==", user?.uid)
      );
  
      // Query directMessages where the current user is the receiver
      const receiverMsgQuery = query(
        collection(firestoreDB, "directMessages"),
        where("participants.receiver.uid", "==", user?.uid)
      );
  
      const senderSnapshot = await getDocs(senderMsgQuery);
      const receiverSnapshot = await getDocs(receiverMsgQuery);
  
      if (!senderSnapshot.empty || !receiverSnapshot.empty) {
        console.log("At least one snapshot contains documents");
  
        const senderDocs = senderSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
        const receiverDocs = receiverSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
  
        // Merge arrays of documents from both snapshots
        const mergedDocs = [...senderDocs, ...receiverDocs];
  
        // Construct a query to fetch documents based on IDs
        const docIds = mergedDocs.map(doc => doc.id);
        msgQuery = query(
          collection(firestoreDB, "directMessages"),
          where("__name__", "in", docIds)
        );
      } else {
        console.log("Both snapshots are empty, no documents found");
      }
  
      if (msgQuery) {
        const querySnap = await getDocs(msgQuery);
        const newLastMessages: any[] = [];
  
        for (const doc of querySnap.docs) {
          const chatId = doc.id;
          const lastMessageQuery = query(
            collection(firestoreDB, "directMessages", chatId, "messages"),
            orderBy("timeStamp", "desc"),
            limit(1)
          );
          const lastMessageSnapshot = await getDocs(lastMessageQuery);
  
          if (!lastMessageSnapshot.empty) {
            const lastMessageDoc = lastMessageSnapshot.docs[0];
            const lastMessageData = lastMessageDoc.data();
            newLastMessages.push({ chatId, lastMessageData });
          } else {
            console.log("No messages found in chat:", chatId);
          }
        }
  
        setLastMessages(newLastMessages);
      }
    } catch (error) {
      console.error("Error loading last messages:", error);
    }
  };
  // Function to load last messages when navigating to the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadLastMessages);
    return unsubscribe;
  }, [navigation]);

  // Function to load last messages when navigating back from another screen
  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("blur", loadLastMessages);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let m = lastMessages;
    // console.log(JSON.stringify(m, null, 2));
  }, [lastMessages]);

  return (
    <View
      style={{ flex: 2 / 3, position: "relative" }}
      className="p-6 rounded-t-[32px] bg-white border border-gray-500 "
    >
      <Text className="font-[Manrope-Bold] p-2">All messages</Text>
      <FlatList
        data={lastMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item?.chatId}
      />

      <View className="flex items-end justify-end  rounded-full">
        <IconButton
          onPress={() => {
            navigation.navigate("AddToChatScreen");
          }}
          style={{ position: "absolute", bottom: 0, right: 0 }}
          icon={"plus"}
          iconColor="white"
          className="border border-gray-500 bg-[#6A5BC2] w-[50px] h-[50px] rounded-full"
        />
      </View>
    </View>
  );
};

export default MessageCard;

// bg-[#6A5BC2]
