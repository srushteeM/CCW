import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, StatusBar, } from "react-native";
import Header from "../../components/Header/Header";
const PaymentSummary = () => {
  return (
    <SafeAreaView>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        <Header User={false} />
        <Text style={styles.title}>Payment Summary</Text>
        <View style={styles.container}>
          <View style={styles.productContainer}>
            <Image
              source={require("../../../assets/CoworkSpace.jpg")}
              style={styles.productImage}
            />
            <Text style={styles.coworkTitle}>
              Kognitif Coffee Coworking Space
            </Text>
            <Text style={styles.coworkTitle}>Mansarovar, Jaipur</Text>
            <Text style={styles.coworkAddress}>
              JI.Duwet street No.2, karangasem,kec. Laweyan Bangalore city,
              Karnatka -560021
            </Text>
          </View>
          <View style={{ width: 350 }}>
            <View style={styles.dashedBoarder}>
              <View style={styles.textBox}>
                <Text style={styles.duration}>Duration</Text>
                <Text style={styles.price}>3 Months</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Start Date</Text>
                <Text style={styles.price}>23/12/2022</Text>
              </View>
            </View>
            <View style={styles.dashedBoarder}>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Caution & Deposit (Fixed)</Text>
                <Text style={styles.price}>₹ 20,000</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Cabin 3 x 2 Rent</Text>
                <Text style={styles.price}>₹ 8000</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.priceName}>Open Desk (120)</Text>
                <Text style={styles.price}>₹ 8000</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  borderBottomColor: "rgba(0, 0, 0, 0.1)", // Adjust the opacity as needed
                  borderBottomWidth: 1,
                }}>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>GST ( 5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>CGST ( 2.5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.priceName}>SGST ( 2.5 % )</Text>
                  <Text style={styles.price}>₹ 2000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 36,
    color: "#040152",
    marginLeft: 25,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    marginTop: 10,
    paddingBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    width: 350,
    // height: 302,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  productImage: {
    width: "100%",
    height: 132,
    marginBottom: 15,
    borderRadius: 10,
  },
  coworkTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#040152",
  },

  coworkAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: "#898989",
    lineHeight: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  textBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 10,
  },
  dashedBoarder: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderStyle: "dashed",
    paddingBottom: 10,
  },
  duration: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 18,
    color: "rgba(4, 1, 82, 0.78)",
  },
  priceName: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(4, 1, 82, 0.78)",
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 36,
    color: "#040152",
  },
});
export default PaymentSummary;
