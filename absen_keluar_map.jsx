import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const AbsensiKeluar = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inArea, setInArea] = useState(false);
  const [pressedLocation, setPressedLocation] = useState(null);
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLong, setCurrentLong] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [userData, setUserData] = useState(null);

  const targetLocation = {
    latitude: -6.19795,
    longitude: 106.84758,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCurrentLat(location.coords.latitude);
      setCurrentLong(location.coords.longitude);
      reverseGeocode(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode.length > 0) {
      setLocationName(geocode[0].city || geocode[0].name || geocode[0].street);
    } else {
      setLocationName("Unknown location");
    }
  };

  const checkLocation = () => {
    if (location) {
      const userLat = location.coords.latitude;
      const userLong = location.coords.longitude;

      const distance = getDistance(
        userLat,
        userLong,
        targetLocation.latitude,
        targetLocation.longitude
      );

      if (distance <= 100) {
        setInArea(true);
      } else {
        setInArea(false);
      }
      setModalVisible(true);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPressedLocation({ latitude, longitude });
  };

  const sendAbsensiKeluar = async () => {
    try {
      if (userData) {
        const payload = {
          nik: userData.nik,
          nama_lengkap: userData.nama_lengkap,
          kode_bagian: userData.divisi,
          kode_izin_keluar: "HDR",
        };
        console.log("Sending data to API:", payload);
        const response = await axios.post(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          Alert.alert("Success", "Absen keluar berhasil", [{ text: "OK" }]);
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
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="This is where you are"
          />
          <Marker
            coordinate={{
              latitude: targetLocation.latitude,
              longitude: targetLocation.longitude,
            }}
            title="Target Location"
            description="This is the target area"
          />
          {pressedLocation && (
            <Marker
              coordinate={pressedLocation}
              title={`Lat: ${pressedLocation.latitude}, Lon: ${pressedLocation.longitude}`}
              description="You pressed here"
            />
          )}
        </MapView>
      )}

      <View style={styles.cardMap}>
        <Text style={styles.titleCard}>{locationName}</Text>
        <View style={styles.coordinate}>
          <Text style={styles.latlang}>
            Lat{"\t"}
            {"\t"}
            {"\t"}
            {"\t"}: {currentLat}
          </Text>
          <Text style={styles.latlang}>
            Lang{"\t"}
            {"\t"}: {currentLong}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={checkLocation}
          style={styles.button}
          labelStyle={styles.labelButton}
        >
          Pulang
        </Button>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {inArea
                ? "Anda berada dalam area. Absen keluar berhasil."
                : "Anda tidak berada dalam area. Absen keluar gagal."}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.White,
  },
  map: {
    width: width,
    height: height,
  },
  button: {
    padding: 3,
    borderRadius: 15,
    backgroundColor: Color.Primary,
  },
  labelButton: { fontFamily: Font["Poppins-Bold"] },
  cardMap: {
    position: "absolute",
    width: width - 30,
    paddingHorizontal: 20,
    height: "25%",
    borderRadius: 20,
    backgroundColor: "white",
    bottom: 40,
    left: 15,
    right: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex: 1,
  },
  titleCard: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
    marginTop: 20,
    color: Color.Primary,
  },
  coordinate: { gap: 5, marginBottom: 20, flexDirection: "column" },
  latlang: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: Color.Primary,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: Color.White,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AbsensiKeluar;
