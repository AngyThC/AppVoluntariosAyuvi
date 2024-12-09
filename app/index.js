import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>¡Bienvenido al Inicio!</Text>
      <Button title="Ir a Acerca de" onPress={() => router.push("/about")} />
    </View>
  );
}
