import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../config/firebase.config";
import {
  clearStorage,
  removeUserSession,
} from "../../expostorage/LocalStorage";
import { setSignOut } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const handleButton = async () => {
    try {
      await signOut(firebaseAuth); // Sign out the user
      await clearStorage(); // Clear user session from storage
      await removeUserSession();
      dispatch(setSignOut());
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
      <StatusBar style="light" backgroundColor="#6A5BC2" />

      <View className="flex-1 justify-between " >
        {/* header */}
        <View className="flex-1">
          <Text>Profile</Text>
        </View>
        {/* header */}

        {/* bottom */}
        <View className="flex-1">
          <Pressable
            className="mt-2"
            onPress={() => {
              handleButton();
            }}
          >
            <Text>SIGN OUT</Text>
          </Pressable>
        </View>
        {/* bottom */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
