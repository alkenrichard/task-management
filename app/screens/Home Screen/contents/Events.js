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
import styles from "../css/EventsStyles";

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

const data = [
  {
    id: 1,
    title: "Juni - Jangan lupa pakai tiket",
    description: newsletterDescription,
    image: Collection.Event1,
  },
  {
    id: 2,
    title: "Juli - Jangan lupa pakai tiket",
    description: newsletterDescription,
    image: Collection.Event2,
  },
];

const EventCard = ({ title, description, image }) => {
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

export default function Events() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Heading text={"Acara"} />
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
        </Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <EventCard
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

