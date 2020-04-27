import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
      <Text style={styles.title}>Insert event information</Text>
      <View style={styles.inputSection}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={showDatepicker}>
            <Text style={styles.btnText}>Date</Text>
          </TouchableOpacity>
          <Text style={styles.outputText}>Date: {date.getDate()}</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={showTimepicker}>
            <Text style={styles.btnText}>Start Time</Text>
          </TouchableOpacity>
          <Text style={styles.outputText}>
            Starting time: {startDate.getHours()}
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleEndTime}>
            <Text style={styles.btnText}>End Time</Text>
          </TouchableOpacity>
          <Text style={styles.outputText}>Ending Time: {date.getHours()}</Text>
        </View>
      </View>
      <View>
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
        <TextInput
          placeholder="Event Name"
          style={{ height: 40, backgroundColor: "#f8f0fa" }}
          placeholderTextColor="#000"
          onChangeText={(text) => setEventName(text)}
          value={eventName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.btnText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "90%",

    width: "100%",
  },
  button: {
    width: "40%",
    margin: 4,
    display: "flex",
    backgroundColor: "#ac588c",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputSection: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  outputText: {
    flex: 2,
  },
  title: {
    fontFamily: "averia-libre",
    fontSize: 22,
    color: "black",
  },
});

export default Calender;
