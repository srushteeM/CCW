import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { BookingStyles } from "../../styles/BookingHistoryStyle";

const UpComingBooking = () => {
  const { height } = Dimensions.get("window");
  return (
    <ScrollView
      style={{ height: height - 280 }}
      showsVerticalScrollIndicator={false}>
      <View style={BookingStyles.productContainer}>
        <View style={BookingStyles.iconBox}>
          <Image
             source={{uri:"#"}}
            style={BookingStyles.icon}
          />
        </View>
        <View style={BookingStyles.textContainer}>
          <Text style={BookingStyles.placeTitle}>Creware Coworks, Jaipur</Text>
          <Text style={BookingStyles.bookingDates}>
            Booking Date : 22/04/2023
          </Text>
          <View style={BookingStyles.deskAndTableBox}>
            <Text style={BookingStyles.totalDesk}>Open Desk x 20</Text>
            <Text style={BookingStyles.totalCabin}>Cabin of 3 x 1</Text>
          </View>
        </View>
        <View>
          <Text style={BookingStyles.totalAmount}> ₹ 100</Text>
        </View>
      </View>

      <View style={BookingStyles.productContainer}>
        <View style={BookingStyles.iconBox}>
          <Image
            source={{uri:"#"}}
            style={BookingStyles.icon}
          />
        </View>
        <View style={BookingStyles.textContainer}>
          <Text style={BookingStyles.placeTitle}>Creware Coworks, Jaipur</Text>
          <Text style={BookingStyles.bookingDates}>
            Booking Date : 22/04/2023
          </Text>
          <View style={BookingStyles.deskAndTableBox}>
            <Text style={BookingStyles.totalDesk}>Open Desk x 20</Text>
            <Text style={BookingStyles.totalCabin}>Cabin of 3 x 1</Text>
          </View>
        </View>
        <View>
          <Text style={BookingStyles.totalAmount}> ₹ 100</Text>
        </View>
      </View>

      <View style={BookingStyles.productContainer}>
        <View style={BookingStyles.iconBox}>
          <Image
             source={{uri:"#"}}
            style={BookingStyles.icon}
          />
        </View>
        <View style={BookingStyles.textContainer}>
          <Text style={BookingStyles.placeTitle}>Creware Coworks, Jaipur</Text>
          <Text style={BookingStyles.bookingDates}>
            Booking Date : 22/04/2023
          </Text>
          <View style={BookingStyles.deskAndTableBox}>
            <Text style={BookingStyles.totalDesk}>Open Desk x 20</Text>
            <Text style={BookingStyles.totalCabin}>Cabin of 3 x 1</Text>
          </View>
        </View>
        <View>
          <Text style={BookingStyles.totalAmount}> ₹ 100</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpComingBooking;
