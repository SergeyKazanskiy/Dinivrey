//export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
import Constants from "expo-constants";
import { Platform } from "react-native";

// let API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;
// if (Platform.OS === "web") {
//   API_BASE_URL = "http://localhost:8000";
// }

// export { API_BASE_URL };

//export const API_BASE_URL = Platform.OS === "web" ? "http://localhost:8000" : Constants.expoConfig?.extra?.apiBaseUrl
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL