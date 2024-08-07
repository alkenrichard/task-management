import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import Color from "../../../utils/Color";

const { width, height } = Dimensions.get("window");

const ScanningFrame = () => {
  const frameSize = 250; // Ukuran persegi
  const cornerRadius = 20; // Jari-jari lengkungan
  const lineLength = 40; // Panjang garis lurus

  // Menghitung posisi tengah
  const centerX = (width - frameSize) / 2;
  const centerY = (height - frameSize) / 2;

  return (
    <View style={styles.overlay}>
      <Svg height={height} width={width}>
        {/* Top Left Corner */}
        <Path
          d={`M${centerX + lineLength},${centerY} 
              L${centerX + cornerRadius},${centerY} 
              Q${centerX},${centerY} ${centerX},${centerY + cornerRadius}
              L${centerX},${centerY + lineLength}`}
          stroke={Color.White}
          strokeWidth="4"
          fill="none"
        />

        {/* Top Right Corner */}
        <Path
          d={`M${centerX + frameSize - lineLength},${centerY} 
              L${centerX + frameSize - cornerRadius},${centerY} 
              Q${centerX + frameSize},${centerY} ${centerX + frameSize},${
            centerY + cornerRadius
          }
              L${centerX + frameSize},${centerY + lineLength}`}
          stroke={Color.White}
          strokeWidth="4"
          fill="none"
        />

        {/* Bottom Left Corner */}
        <Path
          d={`M${centerX},${centerY + frameSize - lineLength} 
              L${centerX},${centerY + frameSize - cornerRadius} 
              Q${centerX},${centerY + frameSize} ${centerX + cornerRadius},${
            centerY + frameSize
          }
              L${centerX + lineLength},${centerY + frameSize}`}
          stroke={Color.White}
          strokeWidth="4"
          fill="none"
        />

        {/* Bottom Right Corner */}
        <Path
          d={`M${centerX + frameSize},${centerY + frameSize - lineLength} 
              L${centerX + frameSize},${centerY + frameSize - cornerRadius} 
              Q${centerX + frameSize},${centerY + frameSize} ${
            centerX + frameSize - cornerRadius
          },${centerY + frameSize}
              L${centerX + frameSize - lineLength},${centerY + frameSize}`}
          stroke={Color.White}
          strokeWidth="4"
          fill="none"
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
