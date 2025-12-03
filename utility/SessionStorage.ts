import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TOKEN = "USER-TOKEN";

const setUserToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN, value);
  } catch (e) {
    console.warn(e);
  }
};
const getUserToken = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(USER_TOKEN);
    return value;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const clearStorage = async () => {
  await AsyncStorage.removeItem(USER_TOKEN);
};

const SessionStorage = { setUserToken, getUserToken, clearStorage };

export default SessionStorage;
