import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import Color from "../../utils/Color";
import Font from "../../utils/Font";
import Collection from "../../utils/Collection";

export const ModalSuccess = ({ visible, onClose, message, onNavigate }) => {
  
  const handlePress = () => {
    if(onNavigate){
      onNavigate();
    }
    onClose();
  }
  
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
            source={Collection.Lottie_Checklist}
            autoPlay
            loop
          />
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handlePress}>
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

export default ModalSuccess;
