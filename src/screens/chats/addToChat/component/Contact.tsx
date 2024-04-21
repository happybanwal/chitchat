import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreDB } from "../../../../../config/firebase.config";
import { Image } from "react-native";
import TopBar from "../../../../components/topbar/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Contact = ({route}:any) => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const navigation = useNavigation<loginScreenProps>();

  const functionality= route?.params

  console.log(functionality)

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

  // Render function for each item in the list
  const renderItem = ({ item }: { item: UserData }) => (
    <View className="  mb-2 border border-gray-500">
      <View className="p-2 border border-gray-500 flex-row items-center ">
        {item?.providerData?.photoURL != null ? (
          <Image
            className="rounded-full  w-[40px] h-[40px]"
            source={{ uri: item?.providerData?.photoURL }}
          />
        ) : (
          <>
            <View className=" bg-[#F4F185] rounded-full w-[40px] h-[40px] items-center justify-center">
              <Text className="text-center font-[Manrope-Medium]">
                {item.providerData.displayName
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
    </View>
  );
  return (
    <SafeAreaView className="flex-1 border border-gray-500">
        {/* {route?.params?.functionality == "group" ? <>
        <TopBar text="Select Contact"/>
        </> : null}
         */}
      <Text className="font-[Manrope-Bold]  mb-5  border border-gray-500">All Contacts</Text>
      <FlatList
        data={contact}
        renderItem={renderItem}
        keyExtractor={(item) => item?.uid}
      />
    </SafeAreaView>
  );
};

export default Contact;
