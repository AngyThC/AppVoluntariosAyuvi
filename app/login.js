import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import axios from "../constants/axios"; // Asegúrate de ajustar la ruta
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Navegación con expo-router

  const handleLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("/usuarios/login", {
        usuario,
        contrasenia,
      });
  
      const { token, usuario: user } = response.data;
  
      // Guardar el token de forma segura
      await SecureStore.setItemAsync("token", token);
  
      Alert.alert("Éxito", "Inicio de sesión exitoso.");
      console.log("Usuario:", user);
  
      // Redirigir al inicio/dashboard
      router.replace("/");
      console.log("Redirigido a /");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Credenciales inválidas."
      );
    } finally {
      setLoading(false);
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default LoginScreen;
