import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../../../config/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgXml } from "react-native-svg";
import { googleButton } from "../../../assets/svg/SvgXML";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { setSignIn } from "../../store/slices/AuthSlice";
import { storeUserSession } from "../../expostorage/LocalStorage";
import { doc, setDoc } from "firebase/firestore";
// import { setLocalData } from "../../expostorage/Expostorage";


WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    // @ts-ignore
    androidClientId:process.env.EXPO_PUBLIC_ANDROIDCLIENTID,
     // @ts-ignore
    webClientId:process.env.EXPO_PUBLIC_WEBCLINETID
  })


  const [loading,setLoading]=useState(false)

  useEffect(() => {
    if (response?.type == "success") {
      console.log("Google sign-in success:", response.type);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(firebaseAuth, credential);
      setLoading(true)
    }
  }, [response]);

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user: any) => {
     
      try{
        if (user) {
          // const userInfo: any = JSON.stringify(user, null, 2);
          // console.log(user.createdAt)
          const userInfo = {
            isAuthenticated: true,
            uid: user?.uid,
            providerData: {
              providerId: user?.providerData[0]?.providerId || null,
              uid: user?.providerData[0]?.uid || null,
              displayName: user?.providerData[0]?.displayName || null,
              email: user?.providerData[0]?.email || null,
              phoneNumber: user?.providerData[0]?.phoneNumber || null,
              photoURL: user?.providerData[0]?.photoURL || null,
            },
            stsTokenManager: {
              refreshToken: user?.stsTokenManager?.refreshToken || null,
              accessToken: user?.stsTokenManager?.accessToken || null,
              expirationTime: user?.stsTokenManager?.expirationTime || null,
            },
          };

          const data = {
            uid: user?.uid,
            providerData: {
              providerId: user?.providerData[0]?.providerId,
              uid: user?.providerData[0]?.uid || null,
              displayName: user?.providerData[0]?.displayName || null,
              email: user?.providerData[0]?.email || null,
              phoneNumber: user?.providerData[0]?.phoneNumber || null,
              photoURL: user?.providerData[0]?.photoURL || null,
            },
          };

            // setDATABASE in FIRESTORE
            setDoc(doc(firestoreDB, "users", user?.uid), data)
            .then(() => {
              console.log("success signup and db creation");
            })
            .catch((error) => {
              console.log(error);
            });


          dispatch(setSignIn(userInfo))
          storeUserSession(user)
          setLoading(false)
        } else {
          console.log("No user authenticated.");
          setLoading(false)
        }
      }catch(error){
        console.error("Error during onAuthStateChanged:", error);
        setLoading(false)
      }
      
    });
    return () => unsubscribe();
  }, []);

  return (
    <View className="border-[1px] rounded-[5px] p-1.5 items-center flex-row justify-center border-[#747775] flex">
      {loading && <ActivityIndicator size={"small"} color={"#6A5BC2"}/>}
      <SvgXml xml={googleButton} height={20} width={20} />
      <TouchableOpacity
        className=" p-2 justify-center  border-black flex"
        onPress={() => {
          promptAsync();
        }}
      >
        <Text className="text-center font-[Manrope-Bold]">
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({});
