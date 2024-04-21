export type RootStackParamList = {
  Splash: undefined;

  // auth
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
  ChatScreen: {
    sender: any;
    receiver: any;
  };
  AddToChatScreen: undefined
  AddToGroupScreen: undefined
  Contact:{
    functionality: string | null
  }
};
