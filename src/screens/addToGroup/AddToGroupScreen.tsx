import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AddToGroupScreen = () => {
  return (
    <SafeAreaView className="bg-[#6A5BC2] flex-1 ">
      {/* header */}
      <View
        style={{ flex: 0.05 }}
        className=" p-4 flex-row items-center justify-between"
      >
        {/* <IconButton
          icon={"arrow-left"}
          // icon={'dots-horizontal'}
          iconColor="white"
          className="-ml-2"
          onPress={() => {
            navigation.goBack();
          }}
        /> */}

        <Text className="text-white font-[Manrope-Medium] ">
          Select Contact
        </Text>
        <View className="ml-2" />
      </View>
      {/* header */}
      <View>
        <Text>AddToGroupScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddToGroupScreen;
