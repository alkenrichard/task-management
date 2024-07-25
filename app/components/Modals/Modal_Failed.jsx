import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

import Color from "../../utils/Color";
import Font from "../../utils/Font";
import Collection from "../../utils/Collection";

const ModalFailed = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LottieView
            style={{ width: 80, height: 80 }}
            source={Collection.Lottie_Close}
            autoPlay
            loop
          />
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OKE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    alignItems: "center",
  },
  modalText: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 17,
    textAlign: "center",
    alignSelf: "center",
  },
  modalButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Color.Red,
    alignSelf: "stretch",
  },
  modalButtonText: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 14,
    color: Color.White,
    textAlign: "center",
  },
});

export default ModalFailed;
