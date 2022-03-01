import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL = 'http://192.168.0.8/api';
const baseURL = 'http://solicitudservicios-apitest.sellosdeseguridad.net/api';

const secSellApi = axios.create({baseURL});

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