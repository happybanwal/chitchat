import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { clearStorage, removeUserSession, retrieveUserSession } from "../../expostorage/LocalStorage";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../config/firebase.config";
import { setSignOut } from "../../store/slices/AuthSlice";


const Home = () => {
  // const data = useSelector((state:any) => {
  //   return state.users;
  // });

  const dispatch=useDispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Home")
        const data = await retrieveUserSession();
        // JSON.stringify(data,null,2)

        // console.log(JSON.stringify(data,null,2))
        
      } catch (error) {
        console.log("Error retrieving user session:", error);
      }
    };
  
    fetchData(); // call the fetchData function
  
  }, []);

  const handleButton = async () => {
    // const dispatch = useDispatch();
    try {
      await signOut(firebaseAuth); // Sign out the user
      await clearStorage(); // Clear user session from storage
      await removeUserSession()
      dispatch(setSignOut())
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <SafeAreaView>
      <Pressable onPress={()=>{
        // dispatch(deleteUser())
        handleButton()
       
      }}>

      <View>
        <Text>  Home</Text>
      </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
