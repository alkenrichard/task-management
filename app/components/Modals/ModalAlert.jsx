import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Color from "../../utils/Color";
import Font from "../../utils/Font";

const ModalAlert = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
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
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 16,
    color: Color.Black,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Color.Primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  modalButtonText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    color: Color.White,
  },
});

export default ModalAlert;
