import { Text, View } from 'react-native'
import React from 'react'

import styles from '../css/PengembanganStyles'

const Pengembangan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Pengembangan Strategis</Text>
      </View>
    </View>
  );
}

export default Pengembangan

