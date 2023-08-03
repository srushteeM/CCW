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
} from "react-native";

import Header from "../../components/Header/Header";
import MyCarousel from "../../components/Carousel";
import { HomeStyles } from "../../styles/DashBoardScreenStyle";
import { auth, db, storage } from "../../../backend/firebaseConfig";
const DashboardScreen = () => {
  //States for information
  const [dataOfSpaces, setDataOfSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);

  //fetch the doc id of nested collections
  const fetchNestedDataDocId = async (collectionRef) => {
    try {
      const snapshot = await collectionRef.get();
      const data = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();
        const nestedCollections = Object.keys(docData).filter(
          (key) =>
            docData[key] instanceof firebase.firestore.CollectionReference
        );

        // Add the document id itself to the data array
        data.push(doc.id);
      });

      return data;
    } catch (error) {
      console.error("Error fetching nested data:", error);
      throw error;
    }
  };

  //Fetch data
  const fetchData = async () => {
    const documents = [];
    const rootCollectionRef = db.collection("working_spaces");
    const data = await fetchNestedDataDocId(rootCollectionRef);

    await Promise.all(
      data.map(async (docId) => {
        try {
          const parentDocRef = db.collection("working_spaces").doc(docId);
          const subcollectionRef = parentDocRef.collection(
            "working_spaces_details"
          );
          const snapshot = await subcollectionRef.get();

          snapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
          });
        } catch (error) {
          console.error("Error fetching documents from subcollection:", error);
        }
      })
    );

    return documents;
  };

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        // Fetch the data from Firestore or any other data source
        const fetchedData = await fetchData();
        setDataOfSpaces(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const { height } = Dimensions.get("window");
  const bottomTabHeight = 80;
  const availableHeight = height - bottomTabHeight;
  const openCarousel = (images) => {
    setCarouselImages(images);
    setCarouselVisible(true);
  };

  const closeCarousel = () => {
    setCarouselVisible(false);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ height: availableHeight }}>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Header Icon={false} />
      <View style={HomeStyles.headerContainer}>
        <Text style={HomeStyles.title}>
          More Productive with Comfortable Place
        </Text>
      </View>
      <View style={HomeStyles.contentContainer}>
        <Text style={HomeStyles.workingSpaceText}>Working Spaces</Text>
        <FlatList
          data={dataOfSpaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={HomeStyles.productContainer}
              onPress={() => {
             //   openCarousel(item.images);
              }}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={HomeStyles.productImage}
              />
              <View style={HomeStyles.productDetails}>
                <Text style={HomeStyles.coworkTitle}>{item.name}</Text>
                <Text style={HomeStyles.coworkLocation}>{item.location}</Text>
                <Text style={HomeStyles.coworkAddress}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeStyles.listContentContainer}
        />
      </View>
      {carouselVisible && (
        <MyCarousel images={carouselImages} onClose={closeCarousel} />
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
