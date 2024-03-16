import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { firebaseAuth } from "../../../config/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "168876734053-vka4fiv14o9b77knik1ph8p890c7tu5n.apps.googleusercontent.com",
    webClientId:
      "168876734053-b264gl5o659nk67edoo5nd8ml70sk9u7.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      console.log("success");
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(firebaseAuth, credential);
    }
  }, [response]);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>GoogleSignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({});
