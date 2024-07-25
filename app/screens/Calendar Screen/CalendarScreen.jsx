import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

import Heading from "../../components/Heading";

import Font from "../../utils/Font";
import Color from "../../utils/Color";
import Collection from "../../utils/Collection";

const CalendarScreen = () => {
  const today = moment().format("YYYY-MM-DD");
  const apiKey = "TYNczLII0RarGkVHDuilLv3GHnsIfGih";
  const countryCode = "ID";
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    fetchHolidaysAndEvents();
  }, []);

  const fetchHolidaysAndEvents = async () => {
    try {
      const holidaysResponse = await axios.get(
        `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=2024`
      );
      const holidaysData = holidaysResponse.data;

      const companyEventsResponse = await axios.get(
        "https://calendar.devbpkpenaburjakarta.my.id/api/event"
      );
      const companyEventsData = companyEventsResponse.data;

      const marked = {};

      if (holidaysData.response && holidaysData.response.holidays) {
        holidaysData.response.holidays.forEach((holiday) => {
          const date = moment(holiday.date.iso).format("YYYY-MM-DD");
          if (!marked[date]) {
            marked[date] = {
              marked: true,
              dotColor: Color.Red,
              events: [],
            };
          }
          marked[date].events.push({
            name: holiday.name,
            time: "-",
            description: "-",
          });
        });
      }

      if (companyEventsData.success && companyEventsData.data) {
        companyEventsData.data.forEach((event) => {
          event.dateRanges.forEach((range) => {
            let currentDate = moment(range.start);
            const endDate = moment(range.end);
            while (currentDate <= endDate) {
              const date = currentDate.format("YYYY-MM-DD");
              if (!marked[date]) {
                marked[date] = {
                  marked: true,
                  dotColor: event.color,
                  events: [],
                };
              }
              marked[date].events.push({
                name: event.title,
                time: event.host,
                description: event.description,
                color: event.color,
              });
              currentDate = currentDate.add(1, "days");
            }
          });
        });
      }

      setMarkedDates(marked);
    } catch (error) {
      console.error("Error fetching holidays and events:", error);
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>?/gm, "");
  };

  return (
    <View style={styles.container}>
      <Heading text={"Schedule"} />
      <Calendar
        style={styles.calendar}
        current={today}
        onDayPress={onDayPress}
        markingType="simple"
        markedDates={markedDates}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          {markedDates[selectedDate] &&
          markedDates[selectedDate].events &&
          markedDates[selectedDate].events.length > 0 ? (
            markedDates[selectedDate].events.map((event, index) => (
              <View key={index} style={styles.eventContainer}>
                <View style={styles.eventDetail}>
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: event.color || Color.Primary },
                    ]}
                  >
                    {event.name}
                  </Text>
                </View>
                <View style={styles.eventDetail}>
                  <Icon name="access-time" size={20} color={Color.GreyText} />
                  <Text style={styles.cardText}>{event.time}</Text>
                </View>
                <View style={styles.eventDetail}>
                  <Icon name="description" size={20} color={Color.GreyText} />
                  <Text style={styles.cardText}>
                    {stripHtmlTags(event.description)}
                  </Text>
                </View>
                {index < markedDates[selectedDate].events.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
          ) : (
            <View style={styles.noScheduleContainer}>
              <Image
                source={Collection.NoSchedule}
                style={styles.imageNoSchedule}
              />
              <Text style={styles.textNoSchedule}>No schedule</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  title: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
  },
  calendar: {
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  cardTitle: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
  },
  cardText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: Color.GreyText,
    marginVertical: 20,
  },
  noScheduleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageNoSchedule: {
    width: 200,
    height: 200,
  },
  textNoSchedule: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
    color: Color.GreyText,
  },
});
