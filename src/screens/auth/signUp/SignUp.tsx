import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FloatingTextInput from "../../../components/textInput/FloatingTextinput";
import MobileInput from "../../../components/mobileInput/MobileInput";
import CommonButton from "../../../components/button/CommonButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../../../../config/firebase.config";
import GoogleSignIn from "../GoogleSignIn";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setSignIn } from "../../../store/slices/AuthSlice";

const SignUp = () => {
  type signUpScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;
  const dispatch = useDispatch();
  const navigation = useNavigation<signUpScreenProps>();

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleFirstNameChange = (text: string) => {
    if (/\s/.test(text) || /[^A-Za-z]/.test(text)) {
      // Space or special character detected, do not update the state
      return;
    }

    // No spaces or special characters, update the state with the new text
    setFirstName(text);

    if (text.trim() === "") {
      setIsValidFirstName(false);
      return;
    }

    // Validate the input
    const isValidInput = /^[A-Za-z]+$/.test(text);
    setIsValidFirstName(isValidInput);

    // console.log({ name: text, isValid: isValidInput });
  };

  const handleLastNameChange = (text: string) => {
    if (/\s/.test(text) || /[^A-Za-z]/.test(text)) {
      return;
    }

    setLastName(text);

    if (text.trim() === "") {
      setIsValidLastName(false);
      return;
    }

    const isValidInput = /^[A-Za-z]+$/.test(text);
    setIsValidLastName(isValidInput);

    // console.log({ name: text, isValid: isValidInput });
  };

  const handleEmailChange = (text: string) => {
    const emailWithoutSpaces = text.replace(/\s/g, "");

    // Update the email state with the sanitized text
    setEmail(emailWithoutSpaces);

    // Check if the sanitized email is empty
    if (!emailWithoutSpaces) {
      // If empty, set isValidEmail to true
      setIsValidEmail(false);
      return;
    }

    // Check if the sanitized email matches the email format
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidInput = regexPattern.test(emailWithoutSpaces);

    // Update isValidEmail state based on the validation result
    setIsValidEmail(isValidInput);
  };

  const handlePhoneNumberChange = (text: string) => {
    // Remove all non-numeric characters
    const numericText = text.replace(/[^0-9+]/g, "");

    // Update state with the cleaned numeric text
    setPhoneNumber(numericText);

    // Check if the phone number is empty
    if (numericText === "") {
      setIsValidPhoneNumber(false);
      return;
    }

    // Perform additional validation
    // In this example, we validate any phone number format
    const isValidInput = /^\+?\d{1,4}\d{10}$/.test(numericText); // Allows for an optional '+' followed by 1 to 4 digits for the country code and 10 digits for the mobile number
    setIsValidPhoneNumber(isValidInput);
    // console.log(text, isValidPhoneNumber);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    // Check if the password is empty
    if (text === "") {
      setIsValidPassword(false);
      return;
    }

    // Check if the password meets the criteria
    const isValidInput =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(text);
    setIsValidPassword(isValidInput);

    // console.log(text);
  };

  // const auth = getAuth();
  const handleButton = async () => {
    if (
      isValidEmail &&
      isValidFirstName &&
      isValidLastName &&
      isValidPhoneNumber &&
      isValidPassword &&
      email &&
      firstName &&
      lastName &&
      phoneNumber &&
      password
    ) {
      // console.log(firstName, lastName, phoneNumber);
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential: any) => {
          // Signed up
          const user = userCredential.user;
          console.log(JSON.stringify(user, null, 2));

          const data = {
            uid: userCredential.user.uid,
            // providerData: userCredential.user.providerData[0],
            // providerData: {
            //   displayName: firstName+" "+lastName,
            //   email: email,
            //   phoneNumber: phoneNumber,
            //   photoURL: null,
            //   // providerId: "password",
            //   // uid: email,
            // },
            providerData: {
              providerId: user?.providerData[0]?.providerId,
              uid: user?.providerData[0]?.uid || null,
              displayName: user?.providerData[0]?.displayName || null,
              email: user?.providerData[0]?.email || null,
              phoneNumber: user?.providerData[0]?.phoneNumber || null,
              photoURL: user?.providerData[0]?.photoURL || null,
            },
          };

          const userInfo = {
            isAuthenticated: true,
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

          // setDATABASE in FIRESTORE
          setDoc(doc(firestoreDB, "users", userCredential?.user.uid), data)
            .then(() => {
              // navigation.navigate('BottomTabNavigator')

              // navigation.navigate("Home");
              console.log("success signup and db creation");
            })
            .catch((error) => {
              console.log(error);
            });

            // REDUX 
            dispatch(setSignIn(userInfo))
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    } else {
      console.log("no");
      setModalVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
        <StatusBar style="light" backgroundColor="#6A5BC2" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* header */}
          <View className="mt-4">
            <Text className=" font-[Manrope-Bold]  mt-2 text-xl">Sign up</Text>
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
            {!isValidEmail && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Invalid Email
              </Text>
            )}
            {/* email */}

            {/* mobile number */}
            <MobileInput
              mobileNumber={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
            {!isValidPhoneNumber && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Invalid Mobile Number
              </Text>
            )}
            {/* mobile number */}

            {/* Firstname */}
            <FloatingTextInput
              label="First Name"
              placeholder="Enter Your First Name"
              iconName="account"
              onChangeText={handleFirstNameChange}
              value={firstName}
            />
            {!isValidFirstName && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Invalid Name (no special character allowed) . Name allowed (
                "FirstName")
              </Text>
            )}
            {/* Firstname */}

            {/* Lastname */}
            <FloatingTextInput
              label="Last Name"
              placeholder="Enter Your Last Name"
              iconName="account"
              onChangeText={handleLastNameChange}
              value={lastName}
            />
            {!isValidLastName && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Invalid Name (no special character allowed) . Name allowed (
                "LastName")
              </Text>
            )}
            {/* Lastname */}

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
            {!isValidPassword && (
              <Text style={{ color: "red", fontFamily: "Manrope-Regular" }}>
                Password must be at least 8 characters long and include at least
                one uppercase letter, one lowercase letter, one digit, and one
                special character.
              </Text>
            )}
            {/* Password */}

            <CommonButton text="Sign up" onPress={handleButton} />
          </View>
          {/* signUp with google */}
          <View className=" justify-between">
            <Text className="font-[Manrope-Light] text-center mt-4 mb-4">
              Or
            </Text>
            <GoogleSignIn />
          </View>
          {/* signUp with google */}
          {/* body */}

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
                navigation.navigate("Login");
              }}
              className="mb-10 flex-row justify-center items-center"
            >
              <Text className="" style={{ fontFamily: "Manrope-Medium" }}>
                Already have an account?
              </Text>
              <Text
                className="text-[#6A5BC2]"
                style={{ fontFamily: "Manrope-Medium" }}
              >
                {"  "}Sign In
              </Text>
            </TouchableOpacity>
          </View>
          {/* footer */}
        </ScrollView>
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

export default SignUp;
