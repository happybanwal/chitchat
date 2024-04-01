import EncryptedStorage from "react-native-encrypted-storage";

// user LOCAL STORAGE
export const storeUserSession = async (value: any) => {
  try {
    // console.log(value);
    await EncryptedStorage.setItem(
      "user_session",
      JSON.stringify({
        value,
      })
    );
    console.log("Congrats! You've just stored your first value!");

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log("here was an error on the native side");
  }
};

export const retrieveUserSession = async () => {
  try {
    const session: any = await EncryptedStorage.getItem("user_session");
    if (session !== undefined) {
      // console.log(session)
      // Congrats! You've just retrieved your first value!
      console.log("Congrats! You've just retrieved your first value!");
      return JSON.parse(session);
    }

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log("here was an error on the native side");
  }
};

export const removeUserSession = async () => {
  try {
    await EncryptedStorage.removeItem("user_session");

    console.log("Congrats! You've just removed your first value!");

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log("here was an error on the native side");
  }
};

// REMOVE ALL LOCAL STORAGE
export const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();

    console.log("Congrats! You've just cleared the device storage!");

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log("here was an error on the native side");
  }
};
