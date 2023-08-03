import React from "react";
import {
  Text,
 Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { IntroScreen1Styles } from "../styles/IntroductionScreen1Styles";

export default function IntroductionScreen1({ navigation }) {
  return (
    <SafeAreaView style={IntroScreen1Styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Image */}
      <View>
        <Image
          style={IntroScreen1Styles.imageStyle}
          source={require("../../assets/IntroScreen1.jpg")}
        />
      </View>

      {/* Title and Content */}
      <View style={IntroScreen1Styles.boxContainer}>
        <Text style={IntroScreen1Styles.titleStyle}>
          Welcome to Creware Coworks
        </Text>
        <Text style={IntroScreen1Styles.contentStyle}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum.
        </Text>
      </View>

      {/* Button */}
      <View>
        <TouchableOpacity
          style={IntroScreen1Styles.buttonStyles}
          onPress={() => {
            navigation.navigate("IntroductionScreen2");
          }}
        >
          <Ionicons name="chevron-forward-outline" color="#FFFFFF" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
