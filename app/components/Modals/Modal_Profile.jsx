import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";

import Color from "../../utils/Color";
import Font from "../../utils/Font";

export const LogoutModal = ({ isVisible, title, message, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={[styles.buttonText, { color: Color.Red }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: Font["Poppins-Bold"],
    marginBottom: 10,
    color: Color.Primary,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: Font["Poppins-Regular"],
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Font["Poppins-Bold"],
    color: Color.Primary,
  },
});

