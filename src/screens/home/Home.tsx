import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slices/UserSlice";

const Home = () => {
  // const data = useSelector((state:any) => {
  //   return state.users;
  // });

  // const dispatch=useDispatch()

  
  // useEffect(()=>{
  //    console.log(JSON.stringify(data, null, 2))
  //  },[])

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
