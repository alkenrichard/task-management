import React from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../../../components/Heading";

import Collection from "../../../utils/Collection";
import styles from "../css/NewsStyles";

const newsletterDescription = `Hai teman-teman dan rekan IT Evangelist BPK PENABUR Jakarta yang tertarik dengan teknologi! 🚀

Kami punya program spesial untuk kalian, IT Newsletter bulanan yang berisi artikel menarik seputar pengetahuan umum dan perkembangan terbaru dalam dunia teknologi komputer. 📰

Bikin Sertifikat Keren dengan Cepat di Canva! 🎓✨ Dalam artikel ini, kita akan membahas cara mudah dan cepat membuat sertifikat menggunakan Canva. Bagi guru dan karyawan, ini adalah solusi praktis untuk memberikan apresiasi kepada siswa atau rekan kerja. Yuk, tingkatkan kreativitasmu dengan Canva! 🚀💼

Penasaran? Jangan lewatkan kesempatan untuk menyimak informasi terbaru ini! 👀

Tanpa basa-basi, yuk langsung cek artikel di bawah ini! 🚀

Dan tentunya, jangan ragu untuk:
✔ Memberikan "Like" untuk konten yang menarik ini
✔ Simpan untuk referensi di masa mendatang
✔ Bagikan kepada teman-temanmu agar mereka juga bisa mendapatkan manfaat dari informasi berharga ini! 🌐💡

Jadi, tunggu apa lagi? Ayo, mari bersama-sama menggali ilmu pengetahuan! 😁🔍

@bpkpenaburjakarta
@bpkpenaburofficial
`;

const dataNews = [
  {
    id: 1,
    title: "Juni - IT Newsletter",
    description: newsletterDescription,
    image: Collection.News1,
  },
  {
    id: 2,
    title: "Juli - IT Newsletter",
    description: newsletterDescription,
    image: Collection.News2,
  },
];

const NewsCard = ({ title, description, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("CardDetail", { title, description, image })
      }
    >
      <View style={styles.card}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>
            {truncateDescription(description)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const truncateDescription = (description) => {
  const words = description.split(" ");
  if (words.length > 13) {
    return words.slice(0, 13).join(" ") + "...";
  }
  return description;
};

export default function News() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Heading text={"Berita"} />
        <FlatList
          data={dataNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <NewsCard
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
        />
      </View>
    </View>
  );
}
