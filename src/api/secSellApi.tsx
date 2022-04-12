import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../env";
// const baseURL = 'http://192.168.0.8/api';
const baseURL = env.baseURL;
const baseURLSeguridad = env.baseURLSeguridad;

const secSellApi = axios.create({baseURL});
export const secSellApiSeg = axios.create({baseURL: baseURLSeguridad});

secSellApi.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('@secSellApiToken');
    if (token) {
      config.headers.authorization = 'Bearer '+token;
    }
    return config;
  }
);

export default secSellApi;