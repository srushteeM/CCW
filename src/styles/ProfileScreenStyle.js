import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container1: {
    width: "100%",
    backgroundColor: " #DCDCDC",
    marginBottom: 20,
    //paddingTop:80
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    height: 133,
    width: "100%",
    backgroundColor: "rgba(208, 2, 27, 0.6)",
  },
  avatarButton: {
    width: 95,
    height: 95,
    borderRadius: 10,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 10,
  },
  logout: {
    backgroundColor: "#F5F8FF",
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    fontWeight: "bold",
    color: "#040152",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    borderRadius: 5,
    backgroundColor: "#FFF",
    height: 43,
    width: 297,
    marginLeft: 20,
    padding: 10,
  },
  textInput2: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    borderRadius: 5,
    backgroundColor: "#FFF",
    height: 43,
    width: 350,
    padding: 10,
  },
  textInputEditable: {
    borderColor: "#040152",
    borderWidth:1,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    borderRadius: 5,
    backgroundColor: "#FFF",
    height: 43,
    width: 297,
    marginLeft: 20,
    padding: 10,
  },
  editButton: {
    borderRadius: 5,
    marginRight: 20,
    backgroundColor: "#FFF",
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    width: 43,
    marginLeft: 10,
  },
  uploadButton: {
    width: 113,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#040152",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginTop: 10,
  },
  uploadButtonText: {
    fontFamily: "Poppins-Regular",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    color: "#040152",
  },
  saveButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  saveButton: {
    //position: "absolute",
    // marginBottom: 41,
    // left: 0,
    // right: 0,
    backgroundColor: "#DF6476",
    borderRadius: 9.66,
    width: 61,
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
});