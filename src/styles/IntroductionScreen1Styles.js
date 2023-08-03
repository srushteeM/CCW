import { StyleSheet } from "react-native";
export const IntroScreen1Styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
  imageStyle: {
    width: "100%",
    height: 466,
    marginBottom: 20,
  },

  titleStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 33,
    color: "#040152",
    marginLeft: 15,
    marginBottom: 15,
  },
  contentStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    color: "#A0A0A0",
    marginLeft: 15,
    marginBottom: 15,
    paddingRight: 15,
  },
  buttonStyles: {
    backgroundColor: "#040152",
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    padding: 5,
    marginRight: 25,
    borderRadius: 5,
  },
});
