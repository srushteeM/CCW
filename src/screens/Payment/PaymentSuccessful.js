import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,Image
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { PaySuccess } from "../../styles/PaymentSuccessStyle";

export const PaymentSuccessful = () => {
  return (
    <SafeAreaView>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        <Image
          source={require("../../../assets/PaymentSuccess.jpg")}
          style={PaySuccess.image}
        />
      </View>
      <View style={PaySuccess.container}>
        <View style={PaySuccess.childContainer}>
          <View style={PaySuccess.IconBox}>
            <AntDesign
              name='check'
              size={30}
              color='#040152'
              style={{ padding: 15 }}
            />
          </View>
          <Text style={PaySuccess.title}>Payment Successful</Text>
          <Text style={PaySuccess.description}>
            Congratulations on becoming our member
          </Text>
          <Text style={PaySuccess.description}>
            Cabin of 3 x 2 , 120 Open Desk has been successfully booked.
          </Text>
          <TouchableOpacity style={PaySuccess.HomePageButton}>
            <Text style={PaySuccess.HomePageButtonText}>Home page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
