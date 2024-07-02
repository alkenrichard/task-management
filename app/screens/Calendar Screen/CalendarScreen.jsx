import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";

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
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=2024`
      );
      const data = await response.json();
      if (data.response && data.response.holidays) {
        const holidays = data.response.holidays;
        const marked = {};
        holidays.forEach((holiday) => {
          const date = moment(holiday.date.iso).format("YYYY-MM-DD");
          marked[date] = {
            marked: true,
            dotColor: Color.Red,
            markedDot: { color: Color.Red }, // Menandai hari libur dengan warna merah
            event: { name: holiday.name, time: "All day" }, // Menyatakan bahwa acara ini berlangsung sepanjang hari
          };
        });
        setMarkedDates(marked);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
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
            ? `Time: ${markedDates[selectedDate].event.time}`
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
