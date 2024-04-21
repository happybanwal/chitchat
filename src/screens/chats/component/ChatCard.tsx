import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Contact } from "../../../types/Contact";
import { firestoreDB } from "../../../../config/firebase.config";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";

// Define the Message interface
interface Message {
  uid: string;
  message: string;
  receiver: Contact;
  status: string;
  timeStamp: any; // Assuming this is the type of timeStamp field
}

const ChatCard: React.FC<{
  sender: Contact;
  chatId: string;
  receiver: Contact;
}> = ({ sender, chatId, receiver }) => {
  // console.log(receiver.providerData.photoURL)
  const data = useSelector((state: any) => {
    return state.userAuth;
  });

  const [loading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState<Message[]>([]);
  const [user, setUser] = useState(data);

  const handleSendMessage = async () => {
    const timeStamp = serverTimestamp();

    const data = {
      uid: uuid.v4(),
      timeStamp: timeStamp,
      receiver: receiver,
      sender:sender,
      message: sendMessage,
      status: "unread",
    };

    setSendMessage("");

    await addDoc(
      collection(doc(firestoreDB, "directMessages", chatId), "messages"),
      data
    )
      .then(() => {
        console.log("Message send");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    if (!chatId) return; // Guard clause to handle undefined chatId

    const msgQuery = query(
      collection(firestoreDB, "directMessages", chatId, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data() as Message);
      // console.log(upMsg[0]?.timeStamp);
      setReceiveMessage(upMsg);
      setLoading(false);
    });

    return unsubscribe;
  }, [chatId]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 0.95 }}
      className="p-4 rounded-t-[32px] bg-[#F7F7F7]"
    >
      {/* message */}
      <ScrollView
        className=" p-2 "
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <>
            <View className="justify-center items-center">
              <ActivityIndicator size={"large"} />
            </View>
          </>
        ) : (
          <>
            {receiveMessage?.map((msg, i) =>
              msg?.receiver?.uid != user?.uid ? (
                <>
                  <View key={msg?.uid} className="mb-2">
                    <View
                      style={{ alignSelf: "flex-end" }}
                      className="px-4 bg-[#6A5BC2] w-auto relative py-2  border border-gray-500 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    >
                      <Text className="text-white font-[Manrope-Medium]">
                        {msg?.message}
                      </Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                      {msg?.timeStamp?.seconds && (
                        <Text className="font-[Manrope-ExtraLight] text-[12px] text-slate-500">
                          {new Date(
                            msg?.timeStamp?.seconds * 1000
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </Text>
                      )}
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View key={msg?.uid} className="mb-2 flex-row ">
                   
                    {msg?.receiver?.providerData?.photoURL != null ? (
                      <Image
                      className="rounded-full  w-[40px] h-[40px] mr-2"
                      source={{ uri: msg?.receiver?.providerData?.photoURL }}
                    />
                    ) : (
                      <>
                        <View className=" bg-[#F4F185] rounded-full w-[40px] h-[40px] mr-2 items-center justify-center">
                          <Text className="text-center font-[Manrope-Medium]">
                            {msg.receiver.providerData.displayName
                              .split(" ")
                              .map((word) => word[0].toUpperCase())
                              .join("")}
                          </Text>
                        </View>
                      </>
                    )}
                    <View className="">
                      <View
                        key={msg?.uid}
                        style={{ alignSelf: "flex-start" }}
                        className="px-4 bg-white w-auto relative py-2  rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                      >
                        <Text className="font-[Manrope-Medium]">
                          {msg?.message}
                        </Text>
                      </View>
                      <View style={{ alignSelf: "flex-start" }}>
                        {msg?.timeStamp?.seconds && (
                          <Text className="font-[Manrope-ExtraLight] text-[12px] text-slate-500">
                            {new Date(
                              msg.timeStamp.seconds * 1000
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </>
              )
            )}
          </>
        )}
      </ScrollView>
      {/* message */}

      {/* enter message */}
      <View className="flex-row  justify-between w-full bg-[#F7F7F7]">
        <TextInput
          className=" bg-[#EFEFEF] p-2 rounded-[32px] w-11/12 font-[Manrope-Medium]"
          multiline={true} // Enable multiline
          value={sendMessage}
          placeholder="Type Message"
          onChangeText={(text: any) => {
            setSendMessage(text);
          }}
        />
        <IconButton
          icon={"send"}
          className="w-1/12"
          onPress={() => {
            handleSendMessage();
          }}
        />
      </View>
      {/* enter message */}
    </KeyboardAvoidingView>
  );
};

export default ChatCard;

// border border-gray-500
// bg-[#D9E4EC]
