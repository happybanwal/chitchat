type ProviderData = {
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  uid: string;
};

export type Contact= {
  providerData: ProviderData;
  uid: string;
};
