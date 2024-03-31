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
import { SvgXml } from "react-native-svg";
import { googleButton } from "../../../assets/svg/SvgXML";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/UserSlice";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const [userInfo, setUserInfo] = useState();

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "168876734053-vka4fiv14o9b77knik1ph8p890c7tu5n.apps.googleusercontent.com",
    webClientId:
      "168876734053-b264gl5o659nk67edoo5nd8ml70sk9u7.apps.googleusercontent.comgi",
  });

  useEffect(() => {
    if (response?.type == "success") {
      console.log("response :", response?.type);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(firebaseAuth, credential);
      // navigation.navigate("Home");
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user: any) => {
      if (user) {
        // setUserInfo(user);
        // const userInfo: any = JSON.stringify(user, null, 2);
        // console.log(user.createdAt)
        const userInfo = {
          isLoggedIn: true,
          uid: user?.uid,
          providerData: {
            providerId: user?.providerData[0]?.providerId,
            uid: user?.providerData[0]?.uid || null,
            displayName: user?.providerData[0]?.displayName || null,
            email: user?.providerData[0]?.email || null,
            phoneNumber: user?.providerData[0]?.phoneNumber || null,
            photoURL: user?.providerData[0]?.photoURL || null,
          },
          stsTokenManager: {
            refreshToken: user?.stsTokenManager?.refreshToken,
            accessToken: user?.stsTokenManager?.accessToken,
            expirationTime: user?.stsTokenManager?.expirationTime,
          },
        };

        dispatch(
          addUser(
            userInfo
          )
        );
        // navigation.navigate("Home");
      } else {
        console.log("no user");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View className="border-[1px] rounded-[5px] p-1.5 items-center flex-row justify-center border-[#747775] flex">
      <SvgXml xml={googleButton} height={20} width={20} />
      <TouchableOpacity
        className=" p-2 justify-center  border-black flex"
        onPress={() => {
          promptAsync();
        }}
      >
        <Text className="text-center font-[Manrope-Bold]">
          Sign up with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({});
