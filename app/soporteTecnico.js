import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function CreateSupport() {
  const [descripcion, setDescripcion] = useState("");

  const handleCreateSupport = async () => {
    // Validar que la descripción no esté vacía
    if (!descripcion.trim()) {
      Alert.alert("Error", "La descripción no puede estar vacía.");
      return;
    }

    const newBitacora = {
      descripcion,
      idUsuario: 4, // Cambiar según el usuario actual (voluntario)
      fechaHora: new Date().toISOString(),
      estado: "problema detectado",
      idCategoriaBitacora: 5, // Ajustar según la lógica de tu backend
    };

    try {
      await axios.post("http://192.168.1.13:5000/bitacora/create", newBitacora); // direccion ip para que si funcione
      Alert.alert("Éxito", "El problema fue reportado correctamente.");
      setDescripcion(""); // Limpiar el formulario
    } catch (error) {
      console.error("Error al crear el problema:", error);
      Alert.alert("Error", "No se pudo reportar el problema. Intente nuevamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar Problema Técnico</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe tu problema aquí..."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      <Button
        title="Enviar Problema"
        onPress={handleCreateSupport}
        color="#007AC3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 100,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});
