import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStorage,
  removeUserSession,
  retrieveUserSession,
} from "../../expostorage/LocalStorage";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../config/firebase.config";
import { setSignOut } from "../../store/slices/AuthSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { Icon, IconButton } from "react-native-paper";
import HomeHeader from "./components/HomeHeader";
import MessageCard from "./components/MessageCard";

const Home = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 ">
      <View className="flex-1 bg-[#6A5BC2]">
        {/* headers */}
        <HomeHeader />
        {/* headers */}

        {/* Message section */}
        <MessageCard />
        {/* Message section */}
      </View>
    </SafeAreaView>
  );
};

export default Home;


