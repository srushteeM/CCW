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
    StyleSheet,
    ScrollView,
    Modal
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from "../../components/Header/Header";
import MyCarousel from "../../components/Carousel";
//import RNFS from 'react-native-fs';

import { auth, db, storage } from "../../../backend/firebaseConfig";

const BookOpenDesks = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('2');
    const [c1, setC1] = useState(50)
    const [c2, setC2] = useState(30)
    const [c3, setC3] = useState(40)
    const [buttonActive, setButtonActive] = useState(false)
    const [click1, setClick1] = useState(0)
    const [click2, setClick2] = useState(0)
    const [items, setItems] = useState([
        { label: '2 months', value: '2' },
        { label: '4 months', value: '4' },
        { label: '6 months', value: '6' },
        { label: '8 months', value: '8' },
    ])

    const [carouselVisible, setCarouselVisible] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);

    const carouselData = [
        "https://www.dgicommunications.com/wp-content/uploads/2022/08/Design_a_Flexible_Workspace.jpg",
        "https://knowledge-leader.colliers.com/wp-content/uploads/2019/09/194588533-KL-1024x680-1024x680.jpg",
        "https://blog.woodenstreet.com/images/data/image_upload/16613308681650972289office-design-ideas-trends-banner-min.jpg",
        //     // Add more images here
    ];
    const openCarousel = (images) => {
        setCarouselImages(images);
        setCarouselVisible(true);
    };

    const closeCarousel = () => {
        setCarouselVisible(false);
    };



    const showDatePicker = () => {
        setShowPicker(true);
    };

    const handleDateChange = (event, date) => {

        if (date !== undefined) {
            setSelectedDate(date);
        }
        setShowPicker(false);
    };
    const handleDropdownChange = (item) => {
        setSelectedOption(item.value);
    };

    const increment1 = () => {

        setC1(c1 + 1)
        setClick1(click1 + 1)
        setButtonActive(true)
    }
    const increment2 = () => {
        setC2(c2 + 1)
        setClick2(click2 + 1)
        setButtonActive(true)
    }
    const increment3 = () => {
        setC3(c3 + 1)
    }
    const decrement1 = () => {
        if (click1 > 0) {
            setC1(c1 - 1)
            setClick1(click1 - 1)
        }
    }
    const decrement2 = () => {
        if (click2 > 0) {
            setC2(c2 - 1)
            setClick2(click2 - 1)
        }
    }
    const decrement3 = () => {
        setC3(c3 - 1)
    }

    // useEffect(() => {
    //     setButtonActive(true)
    // }, [c1, c2, c3])
    const RenderHeader = () => {
        return (

            <View>
                
                <View style={{ flexDirection: "row", marginLeft:10 }}>

                    {/* date picker */}
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeTitle}>Start Date</Text>
                        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                            <Text style={styles.datePickerButtonText}>{selectedDate === new Date() ? "Select Date" : selectedDate.toDateString()}</Text>
                        </TouchableOpacity>
                        {showPicker && (

                            <View style={{ zIndex: 9999 }}>
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}

                                />

                            </View>


                        )}

                    </View>


                    {/* drop down for duration */}
                    <View style={{ zIndex: 9999 }}>
                        <Text style={styles.timeTitle} >Duration</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                           

                        />


                    </View>
                </View>
                <Text style={{
                    marginTop: 30, color: "#040152",
                    fontSize: 16,
                    fontFamily: "Poppins-Regular",
                    fontWeight: "bold",
                    marginBottom: 20
                }}>Availability Of Desk</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <RenderHeader />

            <ScrollView
                // stickyHeaderIndices={[0]}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.productContainer}>
                    <View>
                        <TouchableOpacity onPress={() => {
                            openCarousel(carouselData);
                        }}>
                            <Image source={require("../../../assets/CoworkSpace.jpg")} style={{ width: 62, height: 120, opacity: 1 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 5 }}>
                        <Text style={{
                            color: "#040152",
                            fontSize: 16,
                            fontFamily: "Poppins-Regular",
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Open Desks</Text>
                        <View style={styles.floorContainer}>
                            <Text style={styles.floorText}>Floor 1</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9, marginRight: 10
                            }}>Available:  {70 - c1}  </Text>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9
                            }}>Booked: {c1} </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => { decrement1() }}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.countText}>{click1}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => { increment1() }}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: 600, color: "#040152" }}>  of {70 - c1}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "flex-end", width: 104,borderWidth:0,marginLeft:50
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#040152", fontFamily: "Poppins-Regular"
                        }}>₹ 5300</Text>
                    </View>
                    {carouselVisible && (
                        <MyCarousel images={carouselImages} onClose={closeCarousel} />
                    )}
                </View>

                <View style={styles.productContainer}>
                    <View>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/Event.jpg")} style={{ width: 62, height: 120 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 5 }}>
                        <Text style={{
                            color: "#040152",
                            fontSize: 16,
                            fontFamily: "Poppins-Regular",
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Dedicated Desk of 4</Text>
                        <View style={styles.floorContainer}>
                            <Text style={styles.floorText}>Floor 1</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9, marginRight: 10
                            }}>Available: {60 - c2}   </Text>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9
                            }}>Booked: {c2}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => { decrement2() }}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.countText}>{click2}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => { increment2() }}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: 600, color: "#040152" }}>  of {60 - c2}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center", width: 104,marginLeft:40
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#040152", fontFamily: "Poppins-Regular"
                        }}>₹ 5300</Text>
                    </View>
                </View>

                <View style={styles.productContainer}>
                    <View>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/IntroScreen2.jpg")} style={{ width: 62, height: 120 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 5 }}>
                        <Text style={{
                            color: "#040152",
                            fontSize: 16,
                            fontFamily: "Poppins-Regular",
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Dedicated Desk of 2</Text>
                        <View style={styles.floorContainer}>
                            <Text style={styles.floorText}>Floor 1</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9, marginRight: 10
                            }}>Available: 50   </Text>
                            <Text style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#040152",
                                fontFamily: "Poppins-Regular",
                                backgroundColor: "#f5f8ff",
                                borderRadius: 9
                            }}>Booked: 30</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} >
                                <Text style={styles.buttonText} onPress={() => { decrement3() }}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.countText}>0</Text>
                            <TouchableOpacity style={styles.button} >
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: 600, color: "#040152" }}>  of 50</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center", width: 104,marginLeft:40
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#040152", fontFamily: "Poppins-Regular"
                        }}>₹ 5300</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity

                    style={
                        buttonActive == false ? styles.saveButton : [styles.saveButton, { backgroundColor: "#DF6476" }]

                    }

                >
                    <Text style={styles.saveButtonText}>Book Space</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
       // flex: 1
    },
    scrollViewContent: {
        // paddingBottom: 10, // Adjust as needed
        zIndex: -5
    },
    datePicker: {
        backgroundColor: "#ffffff",
        borderRadius: 4,
        marginTop: 7,
        width: 148,
        height: 40,
        // borderWidth: 1,
        justifyContent: "center",
        paddingLeft: 10
        //alignItems: "center",
        // Add more custom styles as needed
    },
    timeContainer: {
        marginRight:17
        // justifyContent: "space-between"
    },
    timeTitle: {
        color: "#040152",
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        fontWeight: "bold",

    },
    dropdownContainer: {

        // width: 161,
        // height: 40,
        // marginTop: 7,
        // borderWidth: 0,

    },
    dropdownText: {
        // fontSize: 10,

    },
    dropdownStyle: {
        // backgroundColor: "#fff",
        // borderWidth: 0,
        // borderRadius: 5,
        // zIndex: 9999

    },
    productContainer: {
        padding: 10,
        // borderWidth: 2,
        width: 350,
        height: 140,
        borderRadius: 5,
        backgroundColor: "#fff",
        flexDirection: "row",
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 69,
        height: 21,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#040152"
    },
    button: {
        width: 20,
        height: 20,


        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 600,
        color: "#040152",
        fontFamily: "Poppins-Regular"
    },
    countText: {
        fontSize: 14,
        fontWeight: 600,
        color: "#040152",
        fontFamily: "Poppins-Regular"
    },
    saveButton: {
        //position: "absolute",
        // marginBottom: 41,
        // left: 0,
        // right: 0,
        backgroundColor: "#808080",
        borderRadius: 9.66,
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 165,
        marginLeft: 164,
        marginBottom: 30,
        marginTop: 10,
    },
    saveButtonText: {
        fontFamily: "Poppins-Regular",
        fontSize: 17,
        fontWeight: 700,
        color: "#fff",
    },
    floorContainer: {
        width: 67,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#040152",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    floorText: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        fontWeight: 600,
        textAlign: "center",
        textAlignVertical: "center",
    },
    avaliableText: {
        fontSize: 8,
        fontFamily: "Poppins-Regular",
        fontWeight: 500,
        textAlign: "center",
        textAlignVertical: "center",
    },
})
export default BookOpenDesks