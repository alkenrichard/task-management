import {  Text, View } from 'react-native'
import React from 'react'

import styles from '../css/GajiStyles';

const Gaji = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Gaji</Text>
      </View>
    </View>
  );
}

export default Gaji