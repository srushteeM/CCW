import { StyleSheet } from "react-native";

export const HeaderStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  child1: { flex: 1 },
  iconBox: {
    width: 47,
    // height: 47,
    backgroundColor: "#e3f0fc",
    borderRadius: 10,
  },
  child2: { flex: 2, alignItems: "flex-end" },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    color: "#000000",
    alignSelf: "flex-end"
    
  },
  startDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 16,
    color: "rgba(208, 2, 27, 0.6)",
    marginTop: 5,
    alignSelf: "flex-end"
  },
});
