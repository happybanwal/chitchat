import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  uid: null,
  providerData: {
    providerId: null,
    uid: null,
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
  },
  stsTokenManager: {
    refreshToken: null,
    accessToken: null,
    expirationTime: null,
  },
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.uid = action.payload.uid;
      // providerData
      state.providerData.providerId = action.payload.providerData.providerId;
      state.providerData.uid = action.payload.providerData.uid;
      state.providerData.displayName = action.payload.providerData.displayName;
      state.providerData.email = action.payload.providerData.email;
      state.providerData.phoneNumber = action.payload.providerData.phoneNumber;
      state.providerData.photoURL = action.payload.providerData.photoURL;
      // stsTokenManager
      state.stsTokenManager.refreshToken =
        action.payload.stsTokenManager.refreshToken;
      state.stsTokenManager.accessToken =
        action.payload.stsTokenManager.accessToken;
      state.stsTokenManager.expirationTime =
        action.payload.stsTokenManager.expirationTime;
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      // providerData
      state.providerData.providerId = null;
      state.providerData.uid = null;
      state.providerData.displayName = null;
      state.providerData.email = null;
      state.providerData.phoneNumber = null;
      state.providerData.photoURL = null;
      // stsTokenManager
      state.stsTokenManager.refreshToken = null;
      state.stsTokenManager.accessToken = null;
      state.stsTokenManager.expirationTime = null;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsAuthenticated = (state: any) => state.userAuth.isAuthenticated;
// export const selectEmail = (state) => state.userAuth.email;
// export const selectUserName = (state) => state.userAuth.userName;

export default authSlice.reducer;
