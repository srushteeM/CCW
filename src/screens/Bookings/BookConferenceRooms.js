import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StatusBar,
    StyleSheet
} from "react-native";

import Header from "../../components/Header/Header";
import { auth, db, storage } from "../../../backend/firebaseConfig";

const BookConferenceRooms=()=>{
    return(
        <View style={styles.container}>
            <Text>Conference Rooms</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        marginTop:20,
        marginLeft:20,
    }
})
export default BookConferenceRooms