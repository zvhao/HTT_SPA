import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = "http://" + "192.168.43.154:8888/api/v1/";

const fetchData = async (url) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(baseUrl + url, {
      headers: {
        "x-client-id": token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", JSON.stringify(error, null, 4));
  }
};
const login = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(baseUrl + "customers/login", data);
    return res.data;
  } catch (error) {
    console.log("error", JSON.stringify(error, null, 4));
    return error;
  }
};
const create = async (url, data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(baseUrl + url, data, {
      headers: {
        "x-client-id": token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

const api = { fetchData, create, login };
export default api;
