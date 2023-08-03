import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StatusBar, } from "react-native";
import Header from "../../components/Header/Header";
import { EventStyles } from "../../styles/EventStyle";
import ExploreEvent from "../../components/Event/ExploreEvent";
import RegisteredEvents from "../../components/Event/RegisteredEvents";

const EventScreen = ({ navigation }) => {
  const [toggle, setToggle] = useState("");

  //this is for toggle the button
  const handleExploreToggle = () => {
    console.log(navigation)
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
        <View style={EventStyles.titleContainer}>
          <View style={{ width: 350, paddingVertical: 20 }}>
            <Text style={EventStyles.title}>Events</Text>
          </View>
        </View>
        <View style={EventStyles.container}>
          <View style={EventStyles.toggleContainer}>
            <TouchableOpacity
              style={
                toggle === ""
                  ? EventStyles.toggleButtonStyle
                  : EventStyles.toggleButton
              }
              onPress={handleExploreToggle}>
              <Text style={EventStyles.toggleButtonText}>Explore Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                toggle === "toggled"
                  ? EventStyles.toggleButtonStyles
                  : EventStyles.toggleButton
              }
              onPress={handleRegisteredToggle}>
              <Text style={EventStyles.toggleButtonText}>
                Registered Events
              </Text>
            </TouchableOpacity>
          </View>
          {toggle === "" ? <ExploreEvent navigation={navigation} /> : <RegisteredEvents navigation={navigation} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;
