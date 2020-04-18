import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Calender = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [endDate, setEndDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
        <Text>{date.toString()}</Text>
      </View>
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
