import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { EventStyles } from "../../styles/EventStyle";
import { auth, db, storage } from "../../../backend/firebaseConfig";

const RegisteredEvents = ({ navigation }) => {
  //States for information
  const [dataOfEvents, setDataOfEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch data
  const fetchData = async () => {
    try {
      const snapshot = await db.collection("registeredEvents").get();
      const documentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDataOfEvents(documentsData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }

    return dataOfEvents;
  };

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        // Fetch the data from Firestore or any other data source
        const fetchedData = await fetchData();

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirestore();
  }, []);

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

  const { height } = Dimensions.get("window");
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  // if (dataOfEvents.length == 0) {
  //   return (
  //     <View >
  //       <Text style={{ justifyContent: "center", alignItems: "center", fontFamily: "Poppins-Regular", fontSize: 30 }}>No events registered yet!</Text>
  //     </View>
  //   )
  // }

  return (
    <View >

      {/* <ScrollView
        style={{ height: height - 280 }}
        showsVerticalScrollIndicator={false}
      > */}
      <FlatList
        data={dataOfEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={EventStyles.productContainer}>
            <View style={EventStyles.productImageBox}>
              <ImageBackground
                source={{ uri: item.event_poster_image }}
                style={EventStyles.productImage}
              >
                <View>
                  <View style={EventStyles.freeButton}>
                    {item.price === 0 ? (
                      <Text style={EventStyles.freeButtonText}>Free</Text>
                    ) : (
                      <Text style={EventStyles.freeButtonText}>
                        {item.price}
                      </Text>
                    )}
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={EventStyles.titleAndButtonBox}>
              <Text style={EventStyles.eventTitle}>{item.event_title}</Text>

              <TouchableOpacity
                style={EventStyles.unRegisterButton}
                onPress={() => {

                  navigation.navigate("Registered Event Details", { "event": item })
                }}
              >
                <Text style={EventStyles.unRegisterButtonText}>
                  UnRegister
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={EventStyles.placeName}>
              {item.working_space_name}
            </Text>
            <View style={EventStyles.details}>
              <MaterialCommunityIcons
                name="calendar-text-outline"
                size={18}
                color="#040152"
              />
              <Text style={EventStyles.detailsText}>
                {convertToDate(item.event_date)}
              </Text>
              <Fontisto name="clock" size={18} color="#040152" />
              <Text style={EventStyles.detailsText}>
                {convertToTime(item.event_start_time)} -
                {convertToTime(item.event_end_time)}
              </Text>
              <Ionicons name="person-outline" size={18} color="#040152" />
              <Text style={EventStyles.detailsText}>
                {item.no_of_persons_registered}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      //  contentContainerStyle={HomeStyles.listContentContainer}
      />
      {/* </ScrollView> */}
    </View>
  );
};

export default RegisteredEvents;
