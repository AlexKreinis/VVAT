import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getEvents } from "../store/actions/MapsActions";

const Calender = (props) => {
  const mapData = useSelector((state) => state.maps.selectedMapData);
  const dispatch = useDispatch();
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === "ios");
    setEndDate(currentDate);
    setStartDate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === "ios");
    setEndDate(currentDate);
  };
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showEndMode = (currentMode) => {
    setShowEnd(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setStartDate(new Date(startDate));
    setEndDate(new Date(startDate));
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const handleEndTime = () => {
    showEndMode("time");
  };

  const onSubmit = async () => {
    setError(null);
    let tempStart = new Date(startDate);
    let tempEnd = new Date(endDate);
    if (tempStart.getTime() === tempEnd.getTime()) {
      setError("Start and end time cannot be the same");
      return;
    } else if (tempStart.getTime() > tempEnd.getTime()) {
      setError("End time cannot be earlier then start time");
      return;
    }
    if (!eventName) {
      setError("You mast add name to your event");
      return;
    }
    try {
      await dispatch(
        createEvent({
          name: eventName,
          start: startDate,
          end: endDate,
          lat: mapData.lat,
          lon: mapData.lon,
        })
      );
      setIsLoading(true);
      await dispatch(getEvents(selectedMapsData.lat, selectedMapsData.lon));
      Alert.alert("Added Event successfully");
      props.nav.navigate("Events");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Insert event information</Text>
        <View style={styles.inputSection}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.btnText}>Date</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>{startDate.toDateString()}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
              <Text style={styles.btnText}>Start Time</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>
              {startDate.toLocaleTimeString().slice(0, -3)}
            </Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={handleEndTime}>
              <Text style={styles.btnText}>End Time</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>
              {endDate.toLocaleTimeString().slice(0, -3)}
            </Text>
          </View>
        </View>
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={startDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          {showEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={endDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <TextInput
            placeholder="Event Name"
            style={{
              height: 40,
              backgroundColor: "#f8f0fa",
              width: "80%",
            }}
            placeholderTextColor="#000"
            onChangeText={(text) => setEventName(text)}
            value={eventName}
            textAlign={"center"}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.btnText}>Create Event</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "50%",
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
    textAlign: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputSection: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  outputText: {
    flex: 2,
    marginLeft: 25,
    fontSize: 20,
  },
  title: {
    fontFamily: "averia-libre",
    fontSize: 22,
    color: "black",
    marginBottom: 15,
  },
});

export default Calender;
