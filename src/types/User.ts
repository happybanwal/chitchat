export interface UserType {
    uid: string;
    email: string | undefined;
    emailVerified: boolean;
    displayName: string | undefined;
    isAnonymous: boolean;
    photoURL: string | undefined;
    providerData: ProviderData[];
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
    };
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
  }
  
  interface ProviderData {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string | undefined;
    photoURL: string;
  }