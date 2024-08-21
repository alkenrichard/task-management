import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns"
import { id } from "date-fns/locale";

import Heading from "../../../components/Heading";

import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";
import styles from "../css/CalendarScreenStyles";

const CalendarScreen = () => {
  const today = moment().format("YYYY-MM-DD");
  const apiKey = "TYNczLII0RarGkVHDuilLv3GHnsIfGih";
  const countryCode = "ID";
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);
  const formattedDate = format(selectedDate, "EEEE, d MMMM yyyy", { locale: id });

  useEffect(() => {
    fetchHolidaysAndEvents();
  }, []);

  useEffect(() => {
    setSelectedDate(today); // Set selected date to today
    markToday(today); // Mark today's date
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

      // Tambahkan penanda untuk tanggal yang dipilih
      if (!marked[selectedDate]) {
        marked[selectedDate] = {};
      }
      marked[selectedDate].selected = true;
      marked[selectedDate].selectedColor = Color.Primary;

      setMarkedDates(marked);
    } catch (error) {
      console.error("Error fetching holidays and events:", error);
    }
  };

  const markToday = (date) => {
    const newMarkedDates = { ...markedDates };

    // Hapus tanda dari tanggal yang sebelumnya dipilih
    Object.keys(newMarkedDates).forEach((date) => {
      if (newMarkedDates[date].selected) {
        delete newMarkedDates[date].selected;
        delete newMarkedDates[date].selectedColor;
      }
    });

    // Tandai tanggal hari ini
    if (!newMarkedDates[date]) {
      newMarkedDates[date] = {};
    }
    newMarkedDates[date].selected = true;
    newMarkedDates[date].selectedColor = Color.Primary;

    setMarkedDates(newMarkedDates);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);

    const newMarkedDates = { ...markedDates };

    // Hapus tanda dari tanggal yang sebelumnya dipilih
    Object.keys(newMarkedDates).forEach((date) => {
      if (newMarkedDates[date].selected) {
        delete newMarkedDates[date].selected;
        delete newMarkedDates[date].selectedColor;
      }
    });

    // Tandai tanggal yang baru dipilih
    if (!newMarkedDates[day.dateString]) {
      newMarkedDates[day.dateString] = {};
    }
    newMarkedDates[day.dateString].selected = true;
    newMarkedDates[day.dateString].selectedColor = Color.Primary;

    setMarkedDates(newMarkedDates);
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
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.card}>
          {markedDates[selectedDate] &&
          markedDates[selectedDate].events &&
          markedDates[selectedDate].events.length > 0 ? (
            markedDates[selectedDate].events.map((event, index) => (
              <View key={index} style={styles.eventContainer}>
                <View style={styles.timeline}>
                  <View style={styles.circle} />
                  {index < markedDates[selectedDate].events.length - 1 && (
                    <View style={styles.line} />
                  )}
                </View>
                <View style={styles.eventContent}>
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
                </View>
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
