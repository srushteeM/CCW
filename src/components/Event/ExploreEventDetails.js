import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Alert
} from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import Header from "../Header/Header";
import ImageCarousel from "../Carousel/ImageCarousel";
import BottomTabNavigator from "../../navigation/BottomTabNavigator";
//import { NavigationRouteContext, useRoute } from "@react-navigation/native";
import { auth, db, storage } from "../../../backend/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
const ExploreEventDetails = ({ route }) => {
  // const route = useRoute();
  const navigation = useNavigation();
  const { event } = route.params;
  const { height } = Dimensions.get("window");


  //--------------------------------------Register Event--------------------------------------------------------
  const registerEvent = (item) => {
    var email = auth.currentUser.email;

    var customerId = "";
    try {
      const query = db.collection("Customers").where("email_id", "==", email);
      query
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            customerId = doc.data().customer_id;
            console.log(customerId);
          });
        })
        .then(() => {
          db.collection("registeredEvents").add({
            event_title: item.event_title,
            event_details: item.event_details,
            event_id: item.event_id,
            event_date: item.event_date,
            event_end_time: item.event_end_time,
            event_start_time: item.event_start_time,
            price: item.price,
            no_of_persons_registered: item.no_of_persons_registered,
            event_poster_image: item.event_poster_image,
            working_space_name: item.working_space_name,
            working_space_location: item.working_space_location,
            customer_email: email,
            customer_id: customerId,
          });
        });
      Alert.alert(
        "Success",
        "Successfully Registered for Event",
        [
          {
            text: "OK",
           onPress: () => navigation.navigate("Event"),
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
    }
  };


  //------------------------------convert timestamp to date format--------------------------------
  const convertToDate = (ts) => {
    //change onboarding date format from timestamp to date format
    const timestamp = ts;

    // Convert the timestamp to milliseconds
    const milliseconds = timestamp.seconds * 1000;

    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);

    // Get the formatted date string
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const dateStr = date.toLocaleDateString("en-US", options);

    const commaIndices = [];
    let currentIndex = -1;

    while ((currentIndex = dateStr.indexOf(",", currentIndex + 1)) !== -1) {
      commaIndices.push(currentIndex);
    }

    if (commaIndices.length >= 2) {
      const secondCommaIndex = commaIndices[1];
      const formattedDate = `${dateStr.slice(
        0,
        secondCommaIndex
      )}${dateStr.slice(secondCommaIndex + 1)}`;

      return formattedDate;
    } else {
      console.log(dateStr);
    }
  };

  //----------------------------------------convert timestamp to time format----------------------------------
  const convertToTime = (ts) => {
    const date = ts.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return time;
  };


  return (
    <SafeAreaView>

      <View>
        {/* <Header User={false} /> */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8} // Set the activeOpacity to control the button's opacity on press
            onPress={() => {
              if (event.price == 0) {
                registerEvent(event)
              } 
              // else {
              //   navigation.navigate("Event Payment Summary", { "event": event })
              // }

            }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={{ width: 350 }}>
            <ScrollView
              style={{ height: height - 200 }}
              showsVerticalScrollIndicator={false}>
              <ImageCarousel />
              <View style={styles.textBox}>
                <Text style={styles.title}>{event.event_title}</Text>
                <Text style={styles.placeName}>
                  {event.working_space_name}
                </Text>
                <View style={styles.dateAndTime}>
                  <MaterialCommunityIcons
                    name='calendar-text-outline'
                    size={18}
                    color='#040152'
                  />
                  <Text style={styles.dateAndTimeText}>
                    {convertToDate(event.event_date)}
                  </Text>
                </View>
                <View style={styles.dateAndTime}>
                  <Fontisto name='clock' size={18} color='#040152' />
                  <Text style={styles.dateAndTimeText}> {convertToTime(event.event_start_time)} :
                    {convertToTime(event.event_end_time)}</Text>
                </View>
              </View>
              <View style={styles.horizontalLine} />
              <View>
                <Text style={styles.detailsTitle}>Event Details</Text>
                <Text style={styles.detailsDesc}>
                  {event.event_details}
                </Text>
              </View>
            </ScrollView>
          </View>

        </View>

      </View>
      <View style={{ marginTop: 75 }}>
        <BottomTabNavigator />
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    paddingVertical: 20,
    paddingBottom:20
  },
  textBox: {
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 36,
    textAlign: "center",
    color: "#040152",
  },
  placeName: {
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 26,
    textAlign: "center",
    color: "#898989",
  },
  dateAndTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  dateAndTimeText: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 18,
    color: "#898989",
  },
  horizontalLine: {
    borderBottomColor: "rgba(137, 137, 137, 0.6)",
    borderBottomWidth: 0.5,
    marginVertical: 15, // Adjust this value to set the spacing above and below the line
  },
  detailsTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    alignItems: "center",
    color: "#040152",
  },
  detailsDesc: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 21,
    alignItems: "center",
    color: "#898989",
    marginTop: 8,
    marginBottom:40
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    backgroundColor: "#4BB543",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
});
export default ExploreEventDetails;
