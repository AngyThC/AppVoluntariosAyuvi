import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../hooks/authMiddleware"; // Middleware de autenticación
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Slot } from "expo-router";

const Drawer = createDrawerNavigator();

export default function Layout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    // Mostrar un indicador de carga mientras verificamos el token
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!isAuthenticated) {
    // Si no está autenticado, renderizar el <Slot> para manejar /login
    return <Slot />;
  }

  // Si está autenticado, renderizar el Drawer Navigator
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f0f0f0",
        },
        headerStyle: {
          backgroundColor: "#4CAF50",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: "Inicio" }}
        getComponent={() => require("./index").default}
      />
      <Drawer.Screen
        name="about"
        options={{ drawerLabel: "Acerca de" }}
        getComponent={() => require("./about").default}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
