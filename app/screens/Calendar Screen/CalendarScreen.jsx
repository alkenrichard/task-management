import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";

import Font from "../../utils/Font";
import Color from "../../utils/Color";
import Heading from "../../components/Heading";

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
          marked[date] = {
            marked: true,
            dotColor: Color.Red,
            event: { name: holiday.name, time: "All day" },
          };
        });
      }

      if (companyEventsData.success && companyEventsData.data) {
        companyEventsData.data.forEach((event) => {
          event.dateRanges.forEach((range) => {
            let currentDate = moment(range.start);
            const endDate = moment(range.end);
            while (currentDate <= endDate) {
              const date = currentDate.format("YYYY-MM-DD");
              if (marked[date]) {
                marked[date].dotColor = Color.Blue; // Kombinasikan titik jika ada libur dan acara pada hari yang sama
                marked[date].event.name += ` & ${event.title}`;
                marked[date].event.time += ` & ${event.host}`;
              } else {
                marked[date] = {
                  marked: true,
                  dotColor: event.color,
                  event: { name: event.title, time: event.host },
                };
              }
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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {markedDates[selectedDate]
            ? markedDates[selectedDate].event.name
            : "No schedule"}
        </Text>
        <Text style={styles.cardText}>
          {markedDates[selectedDate]
            ? `${markedDates[selectedDate].event.time}`
            : ""}
        </Text>
        <Text style={styles.cardText}>
          {markedDates[selectedDate]
            ? `${markedDates[selectedDate].event.time}`
            : ""}
        </Text>
      </View>
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
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
    color: Color.Primary,
  },
  cardText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
  },
});
