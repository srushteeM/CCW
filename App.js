import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";

import BookingLandingScreen from "./src/screens/Bookings/BookingLandingScreen";

export default function App() {
  useEffect(() => {
    // Hide the splash screen
    SplashScreen.preventAutoHideAsync()
      .then(() => {
        // Perform any additional setup or fetch data before hiding splash screen
        // For example, you can use setTimeout to simulate a delay
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 2000); // Hide the splash screen after 3 seconds
      })
      .catch(console.warn);
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    // {/* <PaymentSummary/> */}
    // <BookingLandingScreen/>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
