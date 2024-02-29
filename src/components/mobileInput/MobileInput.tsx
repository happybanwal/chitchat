import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { Button, TextInput as PaperInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";

export type FI = {
  mobileNumber: string;
  onChangeText: (text: string) => void;
};

const MobileInput = ({ onChangeText, mobileNumber }: FI) => {
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <View>
      <PhoneInput
        ref={phoneInput}
        defaultValue={mobileNumber}
        defaultCode="IN"
        layout="first"
        // onChangeText={(text) => onChangeText(text)}
        onChangeFormattedText={(text) => onChangeText(text)}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "#6A5BC2",
          borderWidth: 1,
          width: "100%",
          borderRadius: 4,
          marginTop: 4,
          marginBottom: 4,
        }}
        placeholder={"Enter Mobile Number"}
        textContainerStyle={{ backgroundColor: "white", borderRadius: 4 }}
        textInputStyle={{
          backgroundColor: "white",
          fontFamily: "Manrope-Regular",
          fontSize: 14,
        }}
        codeTextStyle={{
          backgroundColor: "white",
          color: "black",
        }}
        textInputProps={{
          placeholderTextColor: "#8E8E93",
          selectionColor: "#6A5BC2",
          keyboardType: "numeric",
          maxLength: 10,
        }}
      />
    </View>
  );
};
export default MobileInput;
