import { createDrawerNavigator } from "@react-navigation/drawer";
import Notifications from "./notificaciones";

const Drawer = createDrawerNavigator();

export default function Layout() {
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
        headerRight: () => <Notifications />, // Aquí se coloca el componente de notificaciones
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
      <Drawer.Screen
        name="Soporte Técnico"
        options={{ drawerLabel: "Soporte Técnico" }}
        getComponent={() => require("./soporteTecnico").default}
      />
    </Drawer.Navigator>
  );
}
