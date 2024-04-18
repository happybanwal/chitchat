import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { Contact } from "../../../types/Contact";

const ChatHeaders: React.FC<{ receiver: Contact ,sender:Contact }> = ({ receiver }) => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();
  const handleButton = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{ flex: 0.05 }}
      className="p-4   items-center  flex-row justify-between"
    >
      <IconButton
        icon={"arrow-left"}
        // icon={'dots-horizontal'}
        iconColor="white"
        className="-ml-2"
        onPress={handleButton}
      />

      <Text className="font-[Manrope-Medium] text-center text-white">
      {receiver?.providerData?.displayName.toLowerCase()}
      </Text>

      <IconButton
        // icon={"arrow-left"}
        icon={"dots-horizontal"}
        iconColor="white"
        className="ml-2"
        onPress={handleButton}
      />
    </View>
  );
};

export default ChatHeaders;
