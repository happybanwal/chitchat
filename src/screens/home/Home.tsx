import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserSession } from "../../expostorage/LocalStorage";


const Home = () => {
  // const data = useSelector((state:any) => {
  //   return state.users;
  // });

  // const dispatch=useDispatch()


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

  return (
    <SafeAreaView>
      <Pressable onPress={()=>{
        // dispatch(deleteUser())
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
