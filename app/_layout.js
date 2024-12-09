import { createDrawerNavigator } from "@react-navigation/drawer";

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
