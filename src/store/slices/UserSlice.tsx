import { createSlice } from "@reduxjs/toolkit";
import { isLoaded } from "expo-font";

const userInitialState = {
  // displayName: "",
  isLoggedIn: false,
  uid: "",
  providerData: {
    providerId: "",
    uid: "",
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
  },
  stsTokenManager: {
    refreshToken: "",
    accessToken: "",
    expirationTime: null,
  },
  // createdAt: "",
  // lastLoginAt: "",
  // apiKey: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    addUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.uid = action.payload.uid;
      state.providerData.providerId = action.payload.providerData.providerId,
        state.providerData.uid = action.payload.providerData.uid,
        state.providerData.displayName = action.payload.providerData.displayName,
        state.providerData.email = action.payload.providerData.email,
        state.providerData.phoneNumber = action.payload.providerData.phoneNumber,
        state.providerData.photoURL = action.payload.providerData.photoURL
      state.stsTokenManager.refreshToken=action.payload.stsTokenManager.refreshToken,
      state.stsTokenManager.accessToken=action.payload.stsTokenManager.accessToken,
      state.stsTokenManager.expirationTime=action.payload.stsTokenManager.expirationTime
      // state.createdAt =action.payload.createdAt,
      // state.lastLoginAt =action.payload.lastLoginAt,
      // state.apiKey =action.payload.apiKey
    },
    deleteUser(state,action){
      // state.isLoggedIn = false;
      state.uid = ""
      state.providerData.providerId = "",
        state.providerData.uid = "",
        state.providerData.displayName = "",
        state.providerData.email = "",
        state.providerData.phoneNumber = "",
        state.providerData.photoURL = "",
      state.stsTokenManager.refreshToken="",
      state.stsTokenManager.accessToken="",
      state.stsTokenManager.expirationTime=null
    }
  },
});

export const { addUser ,deleteUser} = userSlice.actions;
// 
export const selectIsLoggedIn = (state: { user: { isLoggedIn: any; }; }) => state.user.isLoggedIn;
console.log({selectIsLoggedIn})

export default userSlice.reducer;