import { StyleSheet } from "react-native";

export const EventStyles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    
  },
  title: {
    fontWeight: 700,
    fontSize: 24,
    color: "#040152",
    fontFamily: "Poppins-Regular",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    paddingTop: 20,
  },
  toggleContainer: {
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderTopRightRadius: 10,
  },
  toggleButtonStyle: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderTopRightRadius: 10,
  },
  toggleButtonStyles: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
  },
  toggleButtonText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 21,
    color: "#040152",
  },
  child1: {
   // flex:1,
    backgroundColor: "#FFF",
    width: 350,
    paddingTop: 20,
  },
  productContainer: {
    marginBottom: 15,
   
    padding: 10,
    width: 350,
    height: 278,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
   // borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  productImageBox: {
    marginTop:15,
    width:329,
    height: 149,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  productImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  freeButton: {
    backgroundColor: "#D0021B",
    alignSelf: "flex-start", // Align the button to the start of its container
    paddingHorizontal: 16,
    paddingVertical: 4,
  
  },
  freeButtonText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
  },
  titleAndButtonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
   
  },
  eventTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#040152",
    width: "68%",
    marginBottom:5
  },
  registerButton: {
    backgroundColor: "#4BB543",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    height: 20,
  },
  registerButtonText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 600,
    fontSize: 10,
    color: "#FFFFFF",
  },
  unRegisterButton: {
    backgroundColor: "#DF6476",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    height: 20,
  },
  unRegisterButtonText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 600,
    fontSize: 10,
    color: "#FFFFFF",
  },
  placeName: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: "bold",
    color: "#898989",
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  detailsText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 600,
    fontSize: 9.6,
    lineHeight: 18,
    color: "#898989",
    marginRight:5
  },
  listContentContainer: {
    paddingBottom: 40,
  },
});
