import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript types/interfaces for your Redux state
interface ProviderData {
  providerId: string | null;
  uid: string | null;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface StsTokenManager {
  refreshToken: string | null;
  accessToken: string | null;
  expirationTime: number | null;
}

interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
  providerData: ProviderData;
  stsTokenManager: StsTokenManager;
}

const initialState: AuthState = {
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
    setSignIn: (state, action: PayloadAction<AuthState>) => {
      const { isAuthenticated, uid, providerData, stsTokenManager } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.uid = uid;
      state.providerData = providerData;
      state.stsTokenManager = stsTokenManager;
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      state.providerData = {
        providerId: null,
        uid: null,
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
      };
      state.stsTokenManager = {
        refreshToken: null,
        accessToken: null,
        expirationTime: null,
      };
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

// Define proper type annotations for selector functions
export const selectIsAuthenticated = (state: { userAuth: AuthState }): boolean => state.userAuth.isAuthenticated;
// export const selectEmail = (state: { userAuth: AuthState }): string | null => state.userAuth.email;
// export const selectUserName = (state: { userAuth: AuthState }): string | null => state.userAuth.userName;

export default authSlice.reducer;
