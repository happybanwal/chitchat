import { View, Text } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "react-native-paper";

const HomeHeader = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();
  const data = useSelector((state: any) => {
    return state.userAuth;
  });

  const dispatch = useDispatch();

  //   console.log(data);

  const handleNavigation = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={{ flex: 1 / 3 }} className="p-6  ">
      {/* 1st half */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-[Manrope-Light] text-slate-300 ">
            Hi, {data?.providerData?.displayName}!
          </Text>
          <Text className="font-[Manrope-Regular] text-white ">
            You Received
          </Text>
        </View>

        <IconButton icon={"ship-wheel"} iconColor="white"  onPress={handleNavigation}/>
      </View>
      {/* 1st half */}
      <Text className="font-[Manrope-Bold] text-white ] text-[25px]">
        48 Messages
      </Text>
      {/* 2nd half */}
      <View className="mt-4">
        <Text className="font-[Manrope-Light] text-white ">Contacts List</Text>
        <Text className="font-[Manrope-Regular] text-white ">Contact</Text>
      </View>
      {/* 2nd half */}
    </View>
  );
};

export default HomeHeader;
