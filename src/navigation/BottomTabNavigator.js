import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import EventScreen from "../screens/Event/EventScreen";
import BookingHistoryScreen from "../screens/BookilngHistory/BookingHistoryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      headerMode='none' // Set headerMode to 'none' to hide the header
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return <Ionicons name='home' size={30} color={color} />;
          } else if (route.name === "Event") {
            iconName = "calendar";
            return <Ionicons name='calendar' size={30} color={color} />;
          } else if (route.name === "Booking History") {
            return (
              <MaterialCommunityIcons
                name='calendar-multiple-check'
                size={30}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return <Ionicons name='person-outline' size={30} color={color} />;
          }
        },
        tabBarStyle: {
          height: 80, // Set your desired height here
          paddingBottom: 10, // Adjust padding as needed
          paddingTop: 15,
          borderTopLeftRadius: 20, // Set the desired border-top-left radius here
          borderTopRightRadius: 20, // Set the desired border-top-right radius here
          position: "absolute",
          backgroundColor: "#FFFFFF", // Set your desired background color here
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12, // Adjust font size as needed
          fontWeight: "bold", // Adjust font weight as needed
        },
        tabBarActiveTintColor: "#040152", // Change the active tab color here
        tabBarInactiveTintColor: "#898989", // Change the inactive tab color here
      })}>
      <Tab.Screen
        options={{ headerShown: false }} // Hide header for this screen
        name='Home'
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }} // Hide header for this screen
        name='Event'
        component={EventScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }} // Hide header for this screen
        name='Booking History'
        component={BookingHistoryScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }} // Hide header for this screen
        name='Profile'
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
