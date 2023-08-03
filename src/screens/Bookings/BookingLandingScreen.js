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

import BookCabins from './BookCabins'
import BookConferenceRooms from './BookConferenceRooms'
import BookOpenDesks from './BookOpenDesks'

const BookingLandingScreen = () => {

    const [toggle, setToggle] = useState("");
    const [title, setTitle] = useState("")
    useEffect(() => {
        if (toggle === "") {
          setTitle("Book your open desk at \nCreware Coworks");
        } else if (toggle === "cabins") {
          setTitle("Private spaces for focused works, tailored to your needs");
        } else if (toggle === "conference") {
          setTitle("Innovative meeting spaces for engaging collaborations");
        }
      }, [toggle]);
    //this is for toggle the button
    const handleExploreToggle = () => {

        setToggle("");
    };
    const handleRegisteredToggle = (screen) => {
        setToggle(screen);
    };

    let content;
    if (toggle === "") {
       
        content = <BookOpenDesks />;
    } else if (toggle === "cabins") {
        content = <BookCabins />;
    } else if (toggle === "conference") {
        content = <BookConferenceRooms />;
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View>
                <Header />
            </View>

            <View style={{ marginBottom: 30 }}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <View style={{ justifyContent: "center", alignContent: "center" ,marginRight:5}}>
                        <TouchableOpacity style={toggle == "" ? styles.openDeskButton : [styles.openDeskButton, { backgroundColor: "#fff" }]} onPress={() => handleRegisteredToggle("")}>
                            <Text style={toggle == "" ? styles.buttonText : [styles.buttonText, { color: "#000" }]}>Open Desks</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: "center", alignContent: "center" ,marginRight:5}}>
                        <TouchableOpacity style={toggle == "cabins" ? styles.cabinsButton : [styles.cabinsButton, { backgroundColor: "#fff" }]} onPress={() => handleRegisteredToggle("cabins")}>
                            <Text style={toggle == "cabins" ? styles.buttonText : [styles.buttonText, { color: "#000" }]}>Cabins</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: "center", alignContent: "center" ,marginRight:5}}>
                        <TouchableOpacity style={toggle == "conference" ? styles.conferrenceButton : [styles.conferrenceButton, { backgroundColor: "#fff" }]} onPress={() => handleRegisteredToggle("conference")}>
                            <Text style={toggle == "conference" ? styles.buttonText : [styles.buttonText, { color: "#000" }]}>Conference Rooms</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: "center", alignContent: "center" }}>
                        <TouchableOpacity style={[styles.loungeButton, { backgroundColor: "#fff" }]}>
                            <Text style={[styles.buttonText,{ color: "#000" }]}>Lounge</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {content}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        width: 350,
        height: 72,
        fontFamily: "Poppins-Regular",
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 36,
        color: "#040152",
        left: 20,
        top: 30,
        bottom: 30
    },
    container: {
        backgroundColor: "#f5f8ff",
        marginTop: 30,
        height: 550,

    },
    buttonContainer: {
        width: 358,
        height: 28,
        flexDirection: "row",
      //  justifyContent: "space-around",
        padding: 5,
        marginTop: 20,
        marginLeft: 20,
    },
    openDeskButton: {
        width: 85,
        height: 28,
        backgroundColor: "#DF6476",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    cabinsButton: {
        width: 54,
        height: 28,
        backgroundColor: "#DF6476",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    inactiveCabinsButton: {

    },
    conferrenceButton: {
        width: 127,
        height: 28,
        backgroundColor: "#DF6476",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    loungeButton: {
        width: 55,
        height: 28,
        backgroundColor: "#DF6476",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        fontWeight: 600,
        color: "#fff",

    }
})
export default BookingLandingScreen;