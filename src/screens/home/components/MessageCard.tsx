import { View, Text } from "react-native";
import React, { useState } from "react";

const MessageCard = () => {
  const [messages, setMessages] = useState();

  

  return (
    <View style={{ flex: 2 / 3 }} className="p-6 rounded-t-[32px] bg-white">
      <Text className="font-[Manrope-Bold]">All Messages</Text>
    </View>
  );
};

export default MessageCard;