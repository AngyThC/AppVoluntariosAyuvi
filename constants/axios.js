import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Define la base URL desde tus variables de entorno
const API_URL = process.env.API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Tiempo máximo de espera
});

// Interceptor para agregar el token a cada solicitud
instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
