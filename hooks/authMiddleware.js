import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        console.log("Token encontrado:", token);

        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
      } finally {
        setIsLoading(false); // Termina el estado de carga
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log("isAuthenticated:", isAuthenticated);
      console.log("segments:", segments);

      if (isAuthenticated && segments[0] === "login") {
        console.log("Redirigiendo a /");
        router.replace("/"); // Redirigir al inicio si autenticado
      } else if (!isAuthenticated && segments[0] !== "login") {
        console.log("Redirigiendo a /login");
        router.replace("/login"); // Redirigir a login si no autenticado
      }
    }
  }, [isLoading, isAuthenticated, segments]);

  return { isLoading, isAuthenticated };
}
