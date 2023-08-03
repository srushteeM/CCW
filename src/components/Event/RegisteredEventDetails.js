import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import Header from "../Header/Header";
import ImageCarousel from "../Carousel/ImageCarousel";
import BottomTabNavigator from "../../navigation/BottomTabNavigator";
import { auth, db, storage } from "../../../backend/firebaseConfig";


const RegisteredEventDetails = ({navigation,route}) => {
  const { event } = route.params;
  const { height } = Dimensions.get("window");



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


  //--------------------------------------UnRegister Event----------------------------------------------------
  const unRegisterEvent = (eventId) => {
    db.collection("registeredEvents")
      .where("event_id", "==", eventId)
      .get()
      .then((querySnapshot) => {
        // Iterate over the documents
        querySnapshot.forEach((doc) => {
          // Delete the document
          db.collection("registeredEvents")
            .doc(doc.id)
            .delete()
            .then(() => {
              Alert.alert(
                "Success",
                "Successfully UnRegistered for Event",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("Event"),
                  },
                ],
                { cancelable: false }
              );
            })
            
            .catch((error) => {
              console.error("Error removing document:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  };



  return (
    <SafeAreaView>
      <View>
        {/* <Header User={false} /> */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8} // Set the activeOpacity to control the button's opacity on press
           onPress={()=>{
            unRegisterEvent(event.event_id);
           }}
            
         >
            <Text style={styles.buttonText}>UnRegister</Text>
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
                  <Text style={styles.dateAndTimeText}>{convertToTime(event.event_start_time)} :
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
      <View style={{marginTop:75}}>
      <BottomTabNavigator/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    paddingVertical: 20,
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
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    backgroundColor: "#DF6476",
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
export default RegisteredEventDetails;
