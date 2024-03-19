import React from "react";
import { View } from "react-native";
import { TextInput, DefaultTheme } from "react-native-paper";

export type FI = {
  label: string;
  iconName: string;
  value: string | undefined;
  placeholder: string;
  iconColor?: string | undefined;
  type?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  togglePasswordVisibility?: () => void;
};

const FloatingTextInput = ({
  label,
  iconName,
  placeholder,
  onChangeText,
  value,
  iconColor,
  type,
  secureTextEntry = false,
  togglePasswordVisibility,
}: FI) => {
  return (
    <View>
      <TextInput
        // @ts-ignore
        keyboardType={type ? type : "default"}
        style={{
          fontFamily: "Manrope-Light",
          marginBottom: 5,
          fontSize: 14,
          backgroundColor: "white",
          color: "black",
        }}
        contentStyle={{ fontFamily: "Manrope-Regular" }}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        mode={"outlined"}
        label={label}
        value={value}
        outlineColor={"#6A5BC2"}
        activeOutlineColor={"#6A5BC2"}
        secureTextEntry={secureTextEntry ? true : false}
        // theme={DefaultTheme}
        placeholderTextColor={"#8E8E93"}
        theme={{
          ...DefaultTheme,
          fonts: {
            bodyLarge: {
              fontFamily: "Manrope-Light",
            },
          },
          colors: {
            ...DefaultTheme.colors,
            onSurfaceVariant: "#8E8E93",
          },
        }}
        right={
          <TextInput.Icon
            icon={iconName}
            color={iconColor ? iconColor : "lightgrey"}
            onPress={togglePasswordVisibility}
          />
        }
      />
    </View>
  );
};
export default FloatingTextInput;
