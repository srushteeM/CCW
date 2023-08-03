import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Icon } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HeaderStyles } from "../../styles/HeaderStyle";
const Header = ({ User, Icon }) => {
  return (
    <SafeAreaView>
      <View style={HeaderStyles.container}>
        <View style={HeaderStyles.child1}>
          {Icon === undefined ? (
            <View style={HeaderStyles.iconBox}>
              <AntDesign
                name='arrowleft'
                size={30}
                color='black'
                style={{ padding: 8 }}
              />
            </View>
          ) : null}
        </View>

        <View style={HeaderStyles.child2}>
          {User === undefined ? (
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate("Profile");
              }}>
              <Text style={HeaderStyles.title}>Hello, Anam !</Text>
              <Text style={HeaderStyles.startDate}>
                Your Term Started On 20/05/2023
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
