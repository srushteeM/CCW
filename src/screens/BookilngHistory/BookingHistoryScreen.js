import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View , StatusBar,} from "react-native";
import Header from "../../components/Header/Header";
import { BookingStyles } from "../../styles/BookingHistoryStyle";
import PastBooking from "../../components/BookingHistory/PastBooking";
import UpComingBooking from "../../components/BookingHistory/UpComingBooking";

const BookingHistoryScreen = () => {
  const [toggle, setToggle] = useState("");

  //this is for toggle the button
  const handleExploreToggle = () => {
    setToggle("");
  };
  const handleRegisteredToggle = () => {
    setToggle("toggled");
  };
  return (
    <SafeAreaView>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        <Header User={false} />
        <View style={BookingStyles.titleContainer}>
          <View style={{ width: 350, paddingVertical: 20 }}>
            <Text style={BookingStyles.title}>Booking History</Text>
          </View>
        </View>
        <View style={BookingStyles.container}>
          <View style={BookingStyles.toggleContainer}>
            <TouchableOpacity
              style={
                toggle === ""
                  ? BookingStyles.toggleButtonStyle
                  : BookingStyles.toggleButton
              }
              onPress={handleExploreToggle}>
              <Text style={BookingStyles.toggleButtonText}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                toggle === "toggled"
                  ? BookingStyles.toggleButtonStyles
                  : BookingStyles.toggleButton
              }
              onPress={handleRegisteredToggle}>
              <Text style={BookingStyles.toggleButtonText}>Past</Text>
            </TouchableOpacity>
          </View>
          {toggle === "" ? <UpComingBooking /> : <PastBooking />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
