import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../../../config/firebase.config";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ChatHeaders from "./component/ChatHeaders";
import ChatCard from "./component/ChatCard";

const ChatScreen = ({ route }: any) => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const { sender, receiver } = route.params;

  const [chatId, setChatId] = useState("");

  const handleConversion = async (): Promise<void> => {
    try {
      const { uid: senderId } = sender;
      const { uid: receiverId } = receiver;

      // Ensure consistent order of user IDs in the document ID
      const conversationId =
        senderId < receiverId
          ? `${senderId}-${receiverId}`
          : `${receiverId}-${senderId}`;

      const docRef = doc(firestoreDB, "directMessages", conversationId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        console.log("Document exists in individualConversations collection");
        setChatId(conversationId);
        // Conversation already exists, navigate to chat screen immediately0
        return; // Exit the function early
      }

      console.log(
        "Document does not exist in individualConversations collection"
      );

      setChatId(conversationId);

      // Document doesn't exist, create it
      const data = {
        participants: {
          sender: sender,
          receiver: receiver,
        },
      };

      await setDoc(docRef, data);
      console.log("Conversation document created");

      // Navigate to chat screen after document creation
      // navigation.navigate("ChatScreen");
    } catch (error) {
      console.error("Error handling conversation:", error);
    }
  };

  useEffect(() => {
    handleConversion();
  }, []);

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 ">
      <StatusBar style="light" backgroundColor="#6A5BC2" />
      <View className="flex-1 bg-[#6A5BC2] ">
        {/* headers */}
        <ChatHeaders receiver={receiver} sender={sender} />
        {/* headers */}

        {/* headers */}
        <ChatCard sender={sender} receiver={receiver} chatId={chatId} />
        {/* headers */}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
