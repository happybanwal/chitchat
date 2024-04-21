import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreDB } from "../../../../config/firebase.config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface ProviderData {
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

interface UserData {
  providerData: ProviderData;
  uid: string;
}

const AddToChatScreen = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const data = useSelector((state: any) => {
    return state.userAuth;
  });

  const dispatch = useDispatch();

  const [contact, setContacts] = useState<UserData[]>([]);
  const [user, setUser] = useState(data);

  useLayoutEffect(() => {
    // console.log(user?.uid)
    const msgQuery = query(
      collection(firestoreDB, "users"),
      //  where("email" , "==" ,user?.providerData?.email)
      where("uid", "!=", user?.uid)
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap: any) => {
      const data = querySnap.docs.map((doc: any) => doc.data());
      //   console.log({ data });
      //   console.log(JSON.stringify(data[0], null, 2));
      setContacts(data);
    });

    return unsubscribe;
  }, []);


  const handleNavigation=(item: UserData)=>{
    const data = {
      providerData: {
        displayName: user?.providerData?.displayName,
        email: user?.providerData?.email,
        phoneNumber: user?.providerData?.phoneNumber,
        photoURL: user?.providerData?.photoURL,
        providerId: user?.providerData?.providerId,
        uid: user?.providerData?.uid,
      },
      uid: user?.uid,
    };

    navigation.navigate("ChatScreen", {
      sender: data,
      receiver: item,
    });
  }

  // Render function for each item in the list
  const renderItem = ({ item }: { item: UserData }) => (
    <TouchableOpacity
    onPress={()=>{handleNavigation(item)}}
    className="mb-5">
      <View className="  flex-row items-center ">
        {item?.providerData?.photoURL != null ? (
          <Image
            className="rounded-full  w-[40px] h-[40px]"
            source={{ uri: item?.providerData?.photoURL }}
          />
        ) : (
          <>
            <View className=" bg-[#F4F185] rounded-full w-[40px] h-[40px] items-center justify-center">
              <Text className="text-center font-[Manrope-Medium]">
                {item?.providerData?.displayName
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </Text>
            </View>
          </>
        )}
        <Text className="ml-4 font-[Manrope-Medium]">
          {item?.providerData?.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-[#6A5BC2] flex-1 ">
      {/* header */}
      <View
        style={{ flex: 0.05 }}
        className=" p-4 flex-row items-center justify-between"
      >
        <IconButton
          icon={"arrow-left"}
          // icon={'dots-horizontal'}
          iconColor="white"
          className="-ml-2"
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Text className="text-white font-[Manrope-Medium] ">
          Select Contact
        </Text>
        <View className="ml-2" />
      </View>
      {/* header */}

      {/* body */}
      <View
        style={{ flex: 0.95 }}
        className=" h-full rounded-t-[32px] bg-white p-6 "
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddToGroupScreen");
          }}
          className="flex-row items-center border border-gray-500 p-2 rounded-[32px] mt-3 mb-3"
        >
          <View className="bg-[#6A5BC2] h-[40px] w-[40px] items-center justify-center rounded-full  ">
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color="white"
              className=""
              onPress={() => {
                //   setShowExplanation(true);
              }}
            />
          </View>
          <Text className="font-[Manrope-Bold] ml-4">New group</Text>
        </TouchableOpacity>
        <Text className="font-[Manrope-Bold] mb-3 mt-3">All Contacts</Text>
        <FlatList
          data={contact}
          renderItem={renderItem}
          keyExtractor={(item) => item?.uid}
        />
      </View>
      {/* body */}
    </SafeAreaView>
  );
};

export default AddToChatScreen;
