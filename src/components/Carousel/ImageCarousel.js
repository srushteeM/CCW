import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ViewPropTypes,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const ImageCarousel = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const carouselData = [
    { id: 1, image: require("../../../assets/IntroScreen1.jpg") },
    { id: 2, image: require("../../../assets/IntroScreen2.jpg") },
    { id: 3, image: require("../../../assets/IntroScreen1.jpg") },
    // Add more images here
  ];
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const { width: screenWidth } = Dimensions.get("window");
  return (
    <SafeAreaView>
      <Carousel
        // layout='tinder'?
        layoutCardOffset={9}
        ref={isCarousel}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 20,
          height: 5,
          borderRadius: 10,
          marginHorizontal: 0,
          backgroundColor: "rgba(208, 2, 27, 0.6))",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  slide: {
    width: 350,
    height: 208,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
});

// Use ViewPropTypes.style instead of ViewPropTypes
ImageCarousel.propTypes = {
  style: ViewPropTypes.style,
};
export default ImageCarousel;
