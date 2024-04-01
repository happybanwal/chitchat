import EncryptedStorage from "react-native-encrypted-storage";

// Store user session in encrypted storage
export const storeUserSession = async (value: any) => {
  try {
    await EncryptedStorage.setItem(
      "user_session",
      JSON.stringify({
        value,
      })
    );
    console.log("Congrats! You've just stored your user value!");
  } catch (error) {
    console.error("Error storing user session:", error);
  }
};

// Retrieve user session from encrypted storage
export const retrieveUserSession = async () => {
  try {
    const session: any = await EncryptedStorage.getItem("user_session");
    if (session !== null) {
      console.log("Congrats! You've just retrieved your user value!");
      return JSON.parse(session);
    }
  } catch (error) {
    console.error("Error retrieving user session:", error);
  }
};

// Remove user session from encrypted storage
export const removeUserSession = async () => {
  try {
    await EncryptedStorage.removeItem("user_session");
    console.log("Congrats! You've just removed your user value!");
  } catch (error) {
    console.error("Error removing user session:", error);
  }
};

// Clear all data from encrypted storage
export const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
    console.log("Congrats! You've just cleared the device storage!");
  } catch (error) {
    console.error("Error clearing device storage:", error);
  }
};
