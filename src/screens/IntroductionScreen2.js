import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Unorderedlist from "react-native-unordered-list";
import { IntroScreen2Styles } from "../styles/IntroductionScreen2Styles";


export default function IntroductionScreen2({navigation}) {

  return (
    <SafeAreaView style={IntroScreen2Styles.container}>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      {/* Image */}
      <View>
        <Image
          style={IntroScreen2Styles.imageStyle}
          source={require("../../assets/IntroScreen2.jpg")}
        />
      </View>

       {/* Title and Content */}
      <View style={IntroScreen2Styles.boxContainer}>
        <Text style={IntroScreen2Styles.titleStyle}>
          Services Creware Provides
        </Text>
        <View>
          <Unorderedlist color="#040152">
            <Text style={IntroScreen2Styles.contentStyle}>
              Office as a service for freelancers Enterpreneurs & indiduvals
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text style={IntroScreen2Styles.contentStyle}>
              Corporate Trainings, Events, or Ad-Hoc meeting Conference room
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text style={IntroScreen2Styles.contentStyle}>Fully equipped meeting rooms for rent</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text style={IntroScreen2Styles.contentStyle}>Fully equipped meeting rooms for rent</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text style={IntroScreen2Styles.contentStyle}>Fully equipped meeting rooms for rent</Text>
          </Unorderedlist>
         
        </View>
      </View>

       {/* Button */}
      <View>
        <TouchableOpacity style={IntroScreen2Styles.buttonStyles} onPress={()=>{
              navigation.navigate("Login")
        }}>
          <Ionicons name="chevron-forward-outline" color="#FFFFFF" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
