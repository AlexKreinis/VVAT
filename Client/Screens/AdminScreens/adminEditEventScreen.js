import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import { editEvent } from "../../store/actions/adminActions";
import DateTimePicker from "@react-native-community/datetimepicker";

const adminEditEventScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const eventToEdit = props.navigation.getParam("event");

  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    setStartDate(new Date(eventToEdit.start));
    setEndDate(new Date(eventToEdit.finish));
    setEventName(eventToEdit.name);
  }, []);

  const showDatepicker = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;

    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
    setEndDate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showEndMode = (currentMode) => {
    setShowEnd(true);
    setMode(currentMode);
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
      setError("Event naming is obligatory");
      return;
    }
    try {
      await dispatch(
        editEvent({
          id: eventToEdit._id,
          name: eventName,
          start: startDate,
          end: endDate,
        })
      );
      setIsLoading(true);

      Alert.alert("Event edited successfully");
      props.navigation.navigate("adminEvents");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Edit event information</Text>
        <View style={styles.inputSection}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.btnText}>Date</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>
              {startDate && startDate.toDateString()}
            </Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
              <Text style={styles.btnText}>Start Time</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>
              {startDate && startDate.toLocaleTimeString().slice(0, -3)}
            </Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={handleEndTime}>
              <Text style={styles.btnText}>End Time</Text>
            </TouchableOpacity>
            <Text style={styles.outputText}>
              {endDate && endDate.toLocaleTimeString().slice(0, -3)}
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
            placeholder={eventToEdit.name}
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
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            {isLoading ? (
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Text style={styles.btnText}>Edit Event</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
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
    justifyContent: "flex-start",
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

export default adminEditEventScreen;
