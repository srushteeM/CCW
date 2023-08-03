import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  PanResponder,
} from "react-native";

const MyCarousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        const swipeThreshold = 100; // Adjust this threshold for sensitivity

        if (dx > swipeThreshold) {
          handlePrevImage();
        } else if (dx < -swipeThreshold) {
          handleNextImage();
        }
      },
    })
  ).current;

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Modal visible={true} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer} {...panResponder.panHandlers}>
        <View style={styles.carouselContainer}>
          <Image
            source={{ uri: images[currentIndex] }}
            style={styles.image}
            resizeMode='cover'
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex ? styles.activeDot : null,
                ]}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

MyCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    position: "relative",
    width: 350,
    height: 340,
    borderRadius: 10,
    overflow: "hidden", // Ensure image stays within the container
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,

    backgroundColor: "#DF6476",
    borderRadius: 100,
    zIndex: 2,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 2,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#DF6476",
  },
});

export default MyCarousel;
