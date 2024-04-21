import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import ChatScreen from "../screens/chats/ChatScreen";
import AddToChatScreen from "../screens/chats/addToChat/AddToChatScreen";
import Contact from "../screens/chats/addToChat/component/Contact";
import AddToGroupScreen from "../screens/addToGroup/AddToGroupScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="AddToChatScreen" component={AddToChatScreen} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="AddToGroupScreen" component={AddToGroupScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
