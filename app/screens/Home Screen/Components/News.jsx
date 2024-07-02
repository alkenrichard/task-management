import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Paragraph, Title } from "react-native-paper";

import Heading from "../../../components/Heading";

import Font from "../../../utils/Font";
import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";

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

export default function News() {
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
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginBottom: 5,
  },
  textInput: {
    width: "85%",
    padding: 7,
    paddingHorizontal: 16,
    borderRadius: 30,
    fontSize: 16,
    fontFamily: Font["Poppins-Regular"],
    backgroundColor: Color.White,
  },
  cardContainer: {
    paddingVertical: 8,
  },
  card: {
    width: 350,
    marginBottom: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  cardCover: {
    width: 350,
    height: 170,
  },
  cardContent: { marginTop: 8 },
  cardTitle: {
    fontFamily: Font["Poppins-Medium"],
  },
  cardDesc: {
    fontFamily: Font["Poppins-Regular"],
  },
});
