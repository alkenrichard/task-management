import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Line, Svg } from "react-native-svg";
import Color from "../../../utils/Color";

const { width, height } = Dimensions.get("window");

const ScanningFrame = () => {
  const frameSize = 250; // Ukuran persegi
  const lineLength = 50; // Panjang garis siku

  // Menghitung posisi tengah
  const centerX = (width - frameSize) / 2;
  const centerY = (height - frameSize) / 2;

  return (
    <View style={styles.overlay}>
      <Svg height={height} width={width}>
        {/* Top Left Corner */}
        <Line
          x1={centerX}
          y1={centerY}
          x2={centerX + lineLength}
          y2={centerY}
          stroke={Color.White}
          strokeWidth="4"
        />
        <Line
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY + lineLength}
          stroke={Color.White}
          strokeWidth="4"
        />

        {/* Top Right Corner */}
        <Line
          x1={centerX + frameSize}
          y1={centerY}
          x2={centerX + frameSize - lineLength}
          y2={centerY}
          stroke={Color.White}
          strokeWidth="4"
        />
        <Line
          x1={centerX + frameSize}
          y1={centerY}
          x2={centerX + frameSize}
          y2={centerY + lineLength}
          stroke={Color.White}
          strokeWidth="4"
        />

        {/* Bottom Left Corner */}
        <Line
          x1={centerX}
          y1={centerY + frameSize}
          x2={centerX + lineLength}
          y2={centerY + frameSize}
          stroke={Color.White}
          strokeWidth="4"
        />
        <Line
          x1={centerX}
          y1={centerY + frameSize}
          x2={centerX}
          y2={centerY + frameSize - lineLength}
          stroke={Color.White}
          strokeWidth="4"
        />

        {/* Bottom Right Corner */}
        <Line
          x1={centerX + frameSize}
          y1={centerY + frameSize}
          x2={centerX + frameSize - lineLength}
          y2={centerY + frameSize}
          stroke={Color.White}
          strokeWidth="4"
        />
        <Line
          x1={centerX + frameSize}
          y1={centerY + frameSize}
          x2={centerX + frameSize}
          y2={centerY + frameSize - lineLength}
          stroke={Color.White}
          strokeWidth="4"
        />
      </Svg>
    </View>
  );
};

export default ScanningFrame;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: -25,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
