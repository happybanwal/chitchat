import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  type signUpScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;
  const navigation = useNavigation<signUpScreenProps>();
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text className=" font-[Manrope-Regular]  mt-2">SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
