import { View, Text } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Common";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type TB = {
  text?: string;
};

const TopBar = ({ text }: TB) => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();
  return (
    <View
      style={{ flex: 0.05 }}
      className=" p-4 flex-row items-center justify-between  bg-[#6A5BC2]"
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={30}
        color="white"
        className=""
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Text className="text-white font-[Manrope-Medium] ">{text}</Text>
      <View className="ml-2" />
    </View>
  );
};

export default TopBar;
