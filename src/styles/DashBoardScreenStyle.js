import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 36,
    color: "#040152",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  workingSpaceText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#040152",
    marginTop: 20,
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  productImage: {
    width: "100%",
    height: 132,
    marginBottom: 15,
    borderRadius: 10,
  },
  productDetails: {
    alignItems: "center",
  },
  coworkTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#040152",
  },
  coworkLocation: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#898989",
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  coworkAddress: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#898989",
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});
