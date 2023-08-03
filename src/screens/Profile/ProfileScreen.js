import React, { useEffect, useState } from "react";
//import { Image } from "expo-image";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../styles/ProfileScreenStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import "firebase/compat/auth";
import * as ImagePicker from "expo-image-picker";

import { auth, db, storage } from "../../../backend/firebaseConfig";

const ProfileScreen = ({ navigation }) => {
  const [customerId, setCustomerId] = useState("");
  const [profilePicture, setProfilePicture] = useState("#");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [onboardingDate, setOnboardingDate] = useState("");
  const [nameEditable, setNameEditable] = useState(false);
  const [addressEditable, setAddressEditable] = useState(false);
  const [phoneNumberEditable, setPhoneNumberEditable] = useState(false);
  const [alternateNumberEditable, setAlternateNumberEditable] = useState(false);
  const [docId, setDocId] = useState("");

  //-------------------------------function to select profile picture-------------------------------
  const selectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const { uri } = selectedImage;
      uploadImage(uri, customerId);
    }
  };
  const uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = storage
      .ref()
      .child("user_profiles/" + customerId + "/profilePicture" + imageName);

    return ref.put(blob).then((response) => {
      fetchImage(imageName);
    });
  };
  const fetchImage = async (imageName) => {
    var storageRef = storage
      .ref()
      .child("user_profiles/" + customerId + "/profilePicture" + imageName);

    // Get the download URL
    await storageRef
      .getDownloadURL()
      .then((url) => {
        db.collection("Customers").doc(docId).update({
          profile_image: url,
        });
        setProfilePicture(url);
      })
      .catch((error) => {
        console.log(error);
        setProfilePicture("#");
      });
  };

  //---------------------------------------------------------------------------------------------------

  //---------------------------------------Function to fetch user details--------------------------------------

  const fetchUserDetails = async () => {
    // var email = auth.currentUser.email;
    try {
      const query = db
        .collection("Customers")
        .where("email_id", "==", "srushteemarathe@gmail.com");
      query
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Access the document data
            const data = doc.data();

            //change onboarding date format from timestamp to date format
            const timestamp = data.onboarding_date;

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

            while (
              (currentIndex = dateStr.indexOf(",", currentIndex + 1)) !== -1
            ) {
              commaIndices.push(currentIndex);
            }

            if (commaIndices.length >= 2) {
              const secondCommaIndex = commaIndices[1];
              const formattedDate = `${dateStr.slice(
                0,
                secondCommaIndex
              )}${dateStr.slice(secondCommaIndex + 1)}`;
              setOnboardingDate(formattedDate);
              console.log(formattedDate);
            } else {
              console.log(dateStr);
            }

            setCustomerId(data.customer_id);
            setProfilePicture(data.profile_image);
            setName(data.name);
            setEmail(data.email_id);
            setAddress(data.address);
            setPhoneNumber(data.phone_number);
            setAlternateNumber(data.alternate_number);

            setDocId(doc.id);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //------------------------------------------------------------------------------

  useEffect(() => {
    fetchUserDetails();
  }, []);

  //--------------------------------------Update details in db----------------------------------------
  const updateDetails = () => {
    setNameEditable(false);
    setAddressEditable(false);
    setPhoneNumberEditable(false);
    setAlternateNumberEditable(false);
    db.collection("Customers").doc(docId).update({
      name: name,
      address: address,
      phone_number: phoneNumber,
      alternate_number: alternateNumber,
    });
  };

  const { height } = Dimensions.get("window");
  const bottomTabHeight = 80;
  const availableHeight = height - bottomTabHeight;

  const RenderHeader = () => {
    return (
      <View style={styles.avatarContainer}>
        {/* Profile Picture */}
        <View style={{ marginLeft: 20, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              selectPicture();
            }}
            style={{ margin: 15 }}
          >
            <Image style={styles.avatar} source={{ uri: profilePicture }} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={{ marginRight: 20, justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  // Sign-out successful.
                  navigation.navigate("Login");
                })
                .catch((error) => {
                  // An error happened.
                  console.log(error);
                });
            }}
          >
            <AntDesign name="poweroff" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const RenderFooter = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            updateDetails();
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ height: availableHeight }}>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <RenderHeader />
      <ScrollView
        // stickyHeaderIndices={[0]}
        //  contentContainerStyle={{ flexGrow: 1,paddingBottom:20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
          <KeyboardAvoidingView style={{ marginTop: 20 }}>
            <View>
              {/* Name */}
              <View>
                <Text style={styles.label}>Name</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={
                      nameEditable ? styles.textInputEditable : styles.textInput
                    }
                    placeholder={name}
                    editable={nameEditable}
                    onChangeText={(text) => setName(text)}
                    value={name}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setNameEditable(true);
                    }}
                    style={styles.editButton}
                  >
                    <Ionicons name="pencil" size={18} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* E-mail Id */}
              <View>
                <Text style={styles.label}>E-mail ID</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput2}
                    placeholder={email}
                    editable={false}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    multiline={true}
                    style={
                      addressEditable
                        ? styles.textInputEditable
                        : styles.textInput
                    }
                    placeholder={address}
                    editable={addressEditable}
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setAddressEditable(true);
                    }}
                  >
                    <Ionicons name="pencil" size={18} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Phone number */}
              <View>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={
                      phoneNumberEditable
                        ? styles.textInputEditable
                        : styles.textInput
                    }
                    placeholder={phoneNumber.toString()}
                    editable={phoneNumberEditable}
                    onChangeText={(text) => setPhoneNumber(text)}
                    value={phoneNumber.toString()}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setPhoneNumberEditable(true);
                    }}
                  >
                    <Ionicons name="pencil" size={18} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Alternate Number */}
              <View>
                <Text style={styles.label}>Alternate Number</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={
                      alternateNumberEditable
                        ? styles.textInputEditable
                        : styles.textInput
                    }
                    placeholder={alternateNumber.toString()}
                    editable={alternateNumberEditable}
                    onChangeText={(text) => setAlternateNumber(text)}
                    value={alternateNumber.toString()}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setAlternateNumberEditable(true);
                    }}
                  >
                    <Ionicons name="pencil" size={18} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Onboarding Date */}
              <View>
                <Text style={styles.label}>Onboarding Date</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput2}
                    placeholder={onboardingDate}
                    editable={false}
                  />
                </View>
              </View>
              {/* Upload documents */}
              <View>
                <Text style={styles.label}>Upload Documents</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={()=>{
                  console.log(navigation)
                  navigation.navigate("Upload Files")
                }}>
                  <Text style={styles.uploadButtonText}>Upload file</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        {/* </ScrollView> */}
      </ScrollView>
      <RenderFooter/>
    </SafeAreaView>
  );
};

export default ProfileScreen;

