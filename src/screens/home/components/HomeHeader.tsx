import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/Common";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "react-native-paper";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseAuth, firestoreDB } from "../../../../config/firebase.config";
import { signOut } from "firebase/auth";
import { clearStorage, removeUserSession } from "../../../expostorage/LocalStorage";
import { setSignOut } from "../../../store/slices/AuthSlice";

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

const HomeHeader = () => {
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
      where("uid" , "!=" , user?.uid)
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap: any) => {
      const data = querySnap.docs.map((doc: any) => doc.data());
      console.log({data});
      setContacts(data);
    });

    return unsubscribe;
  }, []);

  // flatlist
  const renderItem: ListRenderItem<UserData> = ({ item }) => {
    const handleNavigation = () => {
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
    };

    return (
      <TouchableOpacity onPress={handleNavigation}>
        <View className="rounded-full  p-2 mr-2 items-center overflow-hidden">
          {item?.providerData?.photoURL != null ? (
            <Image
              className="rounded-full  w-[50px] h-[50px]"
              source={{ uri: item?.providerData?.photoURL }}
            />
          ) : (
            <>
              <View className="p-2 bg-[#F4F185] rounded-full w-[50px] h-[50px] items-center justify-center">
                <Text className="text-center font-[Manrope-Medium]">
                  {item.providerData.displayName
                    .split(" ")
                    .map((word) => word[0].toUpperCase())
                    .join("")}
                </Text>
              </View>
            </>
          )}

          <Text className="font-[Manrope-Light] text-white text-[12px]">
            {item.providerData.displayName.split(" ")[0]}
          </Text>
          <Text className="font-[Manrope-Light] text-white text-[12px]">
            {item.providerData.displayName.split(" ")[1]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleButton = () => {
    navigation.navigate("Profile");
  };

//   const handleButton = async () => {
//     try {
//       await signOut(firebaseAuth); // Sign out the user
//       await clearStorage(); // Clear user session from storage
//       await removeUserSession();
//       dispatch(setSignOut());
//     } catch (error) {
//       console.error("Error during sign out:", error);
//     }
//   };
//   useEffect(()=>{
// handleButton()
//   },[])

  return (
    <View style={{ flex: 1 / 3 }} className="p-6  ">
      {/* 1st half */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-[Manrope-Light] text-slate-300 ">
            Hi, {data?.providerData?.displayName}!
          </Text>
          <Text className="font-[Manrope-Regular] text-white ">
            You Received
          </Text>
        </View>

        <IconButton
          icon={"ship-wheel"}
          // icon={"vector-square"}
          iconColor="white"
          onPress={handleButton}
        />
      </View>
      {/* 1st half */}

      <Text className="font-[Manrope-Bold] text-white ] text-[25px]">
        48 Messages
      </Text>

      {/* 2nd half */}
      <View className="mt-2">
        <Text className="font-[Manrope-Light] text-white mb-2">
          Contacts List
        </Text>
        <FlatList
          horizontal={true}
          data={contact}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
        />
      </View>
      {/* 2nd half */}
    </View>
  );
};

export default HomeHeader;
