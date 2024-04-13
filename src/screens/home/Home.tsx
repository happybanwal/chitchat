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

const Home = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();
  // const data = useSelector((state: any) => {
  //   return state.userAuth;
  // });

  // const dispatch = useDispatch();

  // console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Home")
  //       const data = await retrieveUserSession();
  //       // JSON.stringify(data,null,2)

  //       // console.log(JSON.stringify(data,null,2))

  //     } catch (error) {
  //       console.log("Error retrieving user session:", error);
  //     }
  //   };

  //   fetchData(); // call the fetchData function

  // }, []);

  // const handleButton = async () => {

  //   try {
  //     await signOut(firebaseAuth); // Sign out the user
  //     await clearStorage(); // Clear user session from storage
  //     await removeUserSession()
  //     dispatch(setSignOut())
  //   } catch (error) {
  //     console.error('Error during sign out:', error);
  //   }
  // };

 

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 ">
      <View className="flex-1 bg-[#6A5BC2]">
        {/* headers */}
        <HomeHeader/>
        {/* headers */}

        {/* body */}
        <View style={{ flex: 2 / 3 }} className="p-6 rounded-t-[32px] bg-white">
          <Pressable
            className="mt-2"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text>Profile</Text>
          </Pressable>
        </View>
        {/* body */}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
