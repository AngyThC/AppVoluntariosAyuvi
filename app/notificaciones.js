import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const idPersona = 3; // ID fijo para pruebas

  // Obtener notificaciones del backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.13:5000/notificaciones?idPersona=${idPersona}`
      );

      const activeNotifications = response.data.some(
        (notification) => notification.estado !== 0
      );
      setHasNotifications(activeNotifications);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
    }
  };

  // Lógica para marcar notificación como revisada
  const handleCheckNotification = async (idNotificacion) => {
    try {
      await axios.put(
        `http://192.168.1.13:5000/notificaciones/${idNotificacion}`,
        { estado: 0 }
      );

      // Actualizar el estado local
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.idNotificacion === idNotificacion
            ? { ...notification, estado: 0 }
            : notification
        )
      );
      setHasNotifications(
        notifications.some((notification) => notification.estado !== 0)
      );
    } catch (error) {
      console.error("Error al actualizar la notificación:", error);
    }
  };

  // Efecto para cargar las notificaciones periódicamente
  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000); // Verificar cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Campana de notificaciones */}
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => setModalVisible(true)} // Mostrar modal de notificaciones
      >
        <Icon name="notifications" size={30} color="#fff" />
        {hasNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>

      {/* Modal de notificaciones */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Notificaciones</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.idNotificacion.toString()}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.title}>
                  {item.tipo_notificacione.tipoNotificacion}
                </Text>
                <Text>{item.bitacora.descripcion}</Text>
                <TouchableOpacity
                  onPress={() => handleCheckNotification(item.idNotificacion)}
                >
                  <Icon
                    name={
                      item.estado === 0 ? "check-circle" : "radio-button-unchecked"
                    }
                    size={24}
                    color={item.estado === 0 ? "green" : "gray"}
                  />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text>No hay notificaciones.</Text>}
          />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bellContainer: {
    marginRight: 15,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
