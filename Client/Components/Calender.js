import React, { useState } from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../store/actions/MapsActions";

const Calender = () => {
  const mapData = useSelector((state) => state.maps.selectedMapData);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setStartDate(new Date(date));
    showMode("date");
  };

  const showTimepicker = () => {
    console.log(date);
    showMode("time");
  };
  const handleEndTime = () => {
    setStartDate(new Date(date));
    showMode("time");
  };
  const onSubmit = () => {
    dispatch(
      createEvent({
        name: eventName,
        start: startDate,
        end: date,
        lat: mapData.lat,
        lon: mapData.lon,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Button
            onPress={showDatepicker}
            title="Pick a date for your event!"
          />
        </View>
        <View>
          <Button
            onPress={showTimepicker}
            title="Pick a time for your event!"
          />
          <Button
            onPress={handleEndTime}
            title="Pick an ending time for event"
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View>
        <Text>The day is : {date.getDate()}</Text>
        <Text>The Ending hour is :{date.getHours()}</Text>
        <Text>The starting hour is:{startDate.getHours()}</Text>
        <TextInput
          placeholder="Event name"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setEventName(text)}
          value={eventName}
        />
      </View>
      <Button title="submit" onPress={onSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "80%",
    marginTop: 20,
    width: "100%",
  },
});

export default Calender;
