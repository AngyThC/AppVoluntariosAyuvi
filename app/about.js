import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Esta es la pantalla Acerca de</Text>
      <Button title="Volver al Inicio" onPress={() => router.push("/")} />
    </View>
  );
}
