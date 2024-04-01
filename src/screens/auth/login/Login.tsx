import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FloatingTextInput from "../../../components/textInput/FloatingTextinput";
import CommonButton from "../../../components/button/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../../config/firebase.config";
import GoogleSignIn from "../GoogleSignIn";
import { setSignIn } from "../../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { storeUserSession } from "../../../expostorage/LocalStorage";

const Login = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text: string) => {
    const emailWithoutSpaces = text.replace(/\s/g, "");
    setEmail(emailWithoutSpaces);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    // console.log(text);
  };

  const handleButton = async () => {
    if (email && password) {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential.user;
          console.log("login success :", user);
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
          dispatch(setSignIn(userInfo));
          storeUserSession(userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      console.log("FIll empty");
      setModalVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
        <StatusBar style="light" backgroundColor="#6A5BC2" />
        {/* header */}
        <View className="mt-4">
          <Text className=" font-[Manrope-Bold]  mt-2 text-xl">Login</Text>
        </View>
        {/* header */}

        {/* body */}
        <View className="mt-5">
          {/* email */}
          <FloatingTextInput
            label="Email"
            placeholder="Enter Your Email"
            iconName="email"
            onChangeText={handleEmailChange}
            value={email}
          />
          {/* {!isValidEmail && (
            <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
              Invalid Email
            </Text>
          )} */}
          {/* email */}

          {/* Password */}
          <FloatingTextInput
            label="Password"
            placeholder="Enter Your Password"
            iconName="eye"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={!showPassword}
            togglePasswordVisibility={() => {
              setShowPassword(!showPassword);
            }}
          />
          {/* {!isValidPassword && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Password must be at least 8 characters long and include at least
                one uppercase letter, one lowercase letter, one digit, and one
                special character.
              </Text>
            )}
            Password */}

          {/* Forget Password */}
          {/* <TouchableOpacity onPress={handleForgetPassword}>
            <Text>Forget Password</Text>
          </TouchableOpacity> */}
          {/* Forget Password */}

          <CommonButton text="Login" onPress={handleButton} />

          {/* signUp with google */}
          <View className=" justify-between">
            <Text className="font-[Manrope-Light] text-center mt-4 mb-4">
              Or
            </Text>
            <GoogleSignIn />
          </View>
          {/* signUp with google */}

          {/* footer */}
          <View className="justify-end mt-10 mb-10">
            {/* modal */}
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                  <View style={styles.modalBackground}>
                    {/* Semi-transparent background */}
                    <View style={styles.centeredView}>
                      {/* Modal content */}
                      <View style={styles.modalView}>
                        <Text className="font-[Manrope-Regular]">
                          Are you show bro!!!!
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            {/* modal */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              className="mb-10 flex-row justify-center items-center"
            >
              <Text className="" style={{ fontFamily: "Manrope-Medium" }}>
                Don't have an account?
              </Text>
              <Text
                className="text-[#6A5BC2]"
                style={{ fontFamily: "Manrope-Medium" }}
              >
                {"  "}Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          {/* footer */}
        </View>
        {/* body */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background color
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
