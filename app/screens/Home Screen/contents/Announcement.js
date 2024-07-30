import React from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Heading from "../../../components/Heading";

import Collection from "../../../utils/Collection";
import styles from "../css/AnnouncementStyles";

const data = [
  {
    id: 1,
    title: "Event 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: Collection.Event1,
  },
  {
    id: 2,
    title: "Event 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: Collection.Event2,
  },
  {
    id: 3,
    title: "Event 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: Collection.Event3,
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
      <Card style={styles.card}>
        <Card.Cover source={image} style={styles.cardCover} />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardTitle}>{title}</Title>
          <Paragraph style={styles.cardDesc}>
            {truncateDescription(description)}
          </Paragraph>
        </Card.Content>
      </Card>
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

export default function Announcement() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Heading text={"Berita"} />
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