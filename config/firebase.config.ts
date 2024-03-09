import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4SBMjEvR_SZwXeNkcm4Tn0RhK2yzQKwE",
  authDomain: "chitchat-bce26.firebaseapp.com",
  projectId: "chitchat-bce26",
  storageBucket: "chitchat-bce26.appspot.com",
  messagingSenderId: "957666389892",
  appId: "1:957666389892:web:cf9bb77c6897087bad37d1",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };
