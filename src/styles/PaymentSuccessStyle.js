import { StyleSheet } from "react-native";

export const PaySuccess = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  container: {
    alignItems: "center",
  },
  childContainer: {
    width: 264,
    alignItems: "center",
  },
  IconBox: {
    width: 60,
    height: 60,
    backgroundColor: "#A8FDA6",
    borderRadius: 50,
    marginTop: 35,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 36,
    alignItems: "center",
    textAlign: "center",
    color: "#040152",
    marginTop: 15,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#040152",
    marginTop: 15,
  },
  HomePageButton: {
    backgroundColor: "#DF6476",
    alignItems: "center",
    paddingHorizontal: 53,
    paddingVertical: 12,
    marginTop: 38,
    borderRadius: 10,
  },
  HomePageButtonText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
