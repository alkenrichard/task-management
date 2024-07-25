import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Collection from "../../utils/Collection";
import Font from "../../utils/Font";
import Color from "../../utils/Color";

export const SuccessModal = ({
  visible,
  onClose,
  jumlahHariCuti,
  tanggalMulaiCuti,
  pengganti,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <LottieView
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
          source={Collection.Lottie_Checklist}
          autoPlay
          loop
        />
        <Text style={styles.modalText}>
          Anda telah berhasil mengajukan cuti{"\n"}
          <Text>
            Jumlah Hari{"\t"}
            {"\t"}: {jumlahHariCuti} {"\n"}
          </Text>
          <Text style={styles.start}>
            Dari{"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}:{" "}
            {format(tanggalMulaiCuti, "EEEE, d MMMM yyyy", { locale: id })}
            {"\n"}
          </Text>
          <Text>
            Pengganti{"\t"}
            {"\t"}
            {"\t"}
            {"\t"}: {pengganti}
          </Text>
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export const IncompleteFormModal = ({ visible, onClose }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <LottieView
          style={{ width: 60, height: 60 }}
          source={Collection.Lottie_Close}
          autoPlay
          loop
        />
        <Text style={styles.modalText}>
          Mohon lengkapi semua kolom pada formulir pengajuan cuti.
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>OKE</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    fontFamily: Font["Poppins-Medium"],
  },
  modalButton: {
    padding: 10,
    borderRadius: 12,
  },
  modalButtonText: {
    color: Color.Black,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
    textAlign: "center",
  },
  start: {
    color: Color.Green,
  },
  // RULES
  rulesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 50,
    paddingBottom: 50,
  },
  rulesContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  rulesButton: {
    alignSelf: "flex-end",
  },
  rulesTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Font["Poppins-Bold"],
    color: Color.Primary,
    borderBottomWidth: 1,
    borderBottomColor: Color.GreyText,
    textDecorationLine: "none",
  },
  rulesText: {
    textAlign: "justify",
    fontSize: 15,
    fontFamily: Font["Poppins-Medium"],
  },
});
