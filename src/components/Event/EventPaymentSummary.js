import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity} from "react-native";
import Header from "../Header/Header";

const EventPaymentSummary = ({navigation,route}) => {
    const {event}=route.params;


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
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        {/* <Header User={false} /> */}
        {/* <Text style={styles.title}>Payment Summary</Text> */}
        <View style={styles.container}>
          <View style={styles.productContainer}>
            <Image
              source={require("../../../assets/CoworkSpace.jpg")}
              style={styles.productImage}
            />
            <Text style={styles.coworkTitle}>
             {event.event_title}
            </Text>
            <Text style={styles.coworkTitle}>{event.working_space_name}</Text>
           
          </View>
          <View style={{ width: 350 }}>
            <View style={styles.dashedBoarder}>
              <View style={styles.textBox}>
                <Text style={styles.duration}>Duration</Text>
                <Text style={styles.price}>{convertToTime(event.event_start_time)} :
                    {convertToTime(event.event_end_time)}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Start Date</Text>
                <Text style={styles.price}> {convertToDate(event.event_date)}</Text>
              </View>
            </View>
            <View style={styles.dashedBoarder}>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Caution & Deposit (Fixed)</Text>
                <Text style={styles.price}>₹ {event.price}</Text>
              </View>
            
            </View>
            <View>
              <View
                style={{
                  borderBottomColor: "rgba(0, 0, 0, 0.1)", // Adjust the opacity as needed
                  borderBottomWidth: 1,
                }}>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>GST ( 5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>CGST ( 2.5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>SGST ( 2.5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
              </View>
              <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8} // Set the activeOpacity to control the button's opacity on press
            onPress={() => {
             

            }}
          >
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 36,
    color: "#040152",
    marginLeft: 25,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    marginTop: 10,
    paddingBottom: 20,
    height:"100%",
  },buttonContainer: {
   // position: "absolute",
   // bottom: 15,
    alignSelf: "center",
    backgroundColor: "#4BB543",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
    top:20
   // zIndex: 1,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    width: 350,
    // height: 302,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  productImage: {
    width: "100%",
    height: 132,
    marginBottom: 15,
    borderRadius: 10,
  },
  coworkTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#040152",
  },

  coworkAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: "#898989",
    lineHeight: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  textBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 10,
  },
  dashedBoarder: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderStyle: "dashed",
    paddingBottom: 10,
  },
  duration: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 18,
    color: "rgba(4, 1, 82, 0.78)",
  },
  priceName: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(4, 1, 82, 0.78)",
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 36,
    color: "#040152",
  },
});
export default EventPaymentSummary;
