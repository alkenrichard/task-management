import { CameraView, Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function CameraScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const sendAbsensiData = async (data) => {
    try {
      if (userData) {
        console.log("Sending data to API:", {
          nik: userData.nik,
          nama_lengkap: userData.nama_lengkap,
          kode_bagian: userData.divisi,
        });
        const response = await axios.post(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          {
            nik: userData.nik,
            nama_lengkap: userData.nama_lengkap,
            kode_bagian: userData.divisi,
          }
        );
        if (response.data.success) {
          Alert.alert(
            "Success",
            "Absen masuk berhasil",
            [{ text: "OK", onPress: () => setScanned(false) }],
            { cancelable: false }
          );
          console.log(response.data.message);
        } else {
          Alert.alert("Failed", response.data.message);
          console.error(response.data.message);
        }
      } else {
        Alert.alert("Error", "User data not available");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while sending the request");
      console.error("Error sending absensi data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          {scanned && barcodeData && (
            <View style={styles.barcodeContainer}>
              <Text style={styles.barcodeText}>Barcode: {barcodeData}</Text>
              <Button title="Scan Again" onPress={() => setScanned(false)} />
            </View>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: width,
    height: height,
    aspectRatio: "auto",
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  barcodeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  barcodeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
