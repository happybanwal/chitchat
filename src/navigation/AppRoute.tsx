import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
// import { selectIsLoggedIn } from "../store/slices/UserSlice";
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
      console.log("entering approute ");
      try {
        const data = await retrieveUserSession();
        if (data) {
          console.log("data found");

          const tokenExpirationTime =
            data?.value?.stsTokenManager?.expirationTime;

          if (tokenExpirationTime < Date.now()) {
            console.log("Token has expired");
            setLoading(false);
          } else {
            console.log("Token is not expired");

            const userInfo = {
              isAuthenticated: true,
              uid: data?.value?.uid,
              providerData: {
                providerId: data?.value?.providerData[0]?.providerId,
                uid: data?.value?.providerData[0]?.uid || null,
                displayName: data?.value?.providerData[0]?.displayName || null,
                email: data?.value?.providerData[0]?.email || null,
                phoneNumber: data?.value?.providerData[0]?.phoneNumber || null,
                photoURL: data?.value?.providerData[0]?.photoURL || null,
              },
              stsTokenManager: {
                refreshToken: data?.value?.stsTokenManager?.refreshToken,
                accessToken: data?.value?.stsTokenManager?.accessToken,
                expirationTime: data?.value?.stsTokenManager?.expirationTime,
              },
            };

            dispatch(setSignIn(userInfo));
            setLoading(false);
          }
        } else {
          console.log("data not found");
          dispatch(setSignOut());
          setLoading(false);
        }
      } catch (error) {
        console.log("Error retrieving user session:", error);
      }
    };

    fetchData(); // call the fetchData function
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
