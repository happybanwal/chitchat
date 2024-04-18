import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

import { retrieveUserSession } from "../expostorage/LocalStorage";
import {
  selectIsAuthenticated,
  setSignIn,
  setSignOut,
} from "../store/slices/AuthSlice";
import SplashScreen from "../screens/SplashScreen";

const AppRoute = () => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("entering approute ");
        const data = await retrieveUserSession();
  
        if (!data || !data.value) {
          console.log("data not found");
          dispatch(setSignOut());
          return setLoading(false);
        }
  
        console.log("data found");
  
        const { value } = data;
        const tokenExpirationTime = value?.stsTokenManager?.expirationTime;
  
        if (tokenExpirationTime < Date.now()) {
          console.log("Token has expired");
          return setLoading(false);
        }
  
        console.log("Token is not expired");
  
        const operationType = value?.operationType;
        const userInfo = {
          isAuthenticated: true,
          uid: operationType !== "signIn" ? value?.uid : value?.user?.uid,
          providerData: {
            providerId: operationType !== "signIn" ? value?.providerData[0]?.providerId : value?.user?.providerData[0]?.providerId,
            uid: operationType !== "signIn" ? value?.providerData[0]?.uid : value?.user?.providerData[0]?.uid || null,
            displayName: operationType !== "signIn" ? value?.providerData[0]?.displayName : value?.user?.providerData[0]?.displayName || null,
            email: operationType !== "signIn" ? value?.providerData[0]?.email : value?.user?.providerData[0]?.email || null,
            phoneNumber: operationType !== "signIn" ? value?.providerData[0]?.phoneNumber : value?.user?.providerData[0]?.phoneNumber || null,
            photoURL: operationType !== "signIn" ? value?.providerData[0]?.photoURL : value?.user?.providerData[0]?.photoURL || null,
          },
          stsTokenManager: {
            refreshToken: operationType !== "signIn" ? value?.stsTokenManager?.refreshToken : value?.user?.stsTokenManager?.refreshToken,
            accessToken: operationType !== "signIn" ? value?.stsTokenManager?.accessToken : value?.user?.stsTokenManager?.accessToken,
            expirationTime: operationType !== "signIn" ? value?.stsTokenManager?.expirationTime : value?.user?.stsTokenManager?.expirationTime,
          },
        };
  
        dispatch(setSignIn(userInfo));
        setLoading(false);
      } catch (error: any) {
        console.log("app route :", error?.message);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    console.log({ isAuthenticated: isAuthenticated });
  }, [loading]);

  return (
    <NavigationContainer>
      {loading ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
      {/* Conditional stack navigator rendering based on login state */}

      {/* {isAuthenticated ? <AppNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

export default AppRoute;
