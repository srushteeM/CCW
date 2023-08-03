import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Header from "../components/Header/Header";
import IntroductionScreen1 from "../screens/IntroductionScreen1";
import IntroductionScreen2 from "../screens/IntroductionScreen2";
import UploadFiles from "../screens/Profile/UploadFiles"
import BottomTabNavigator from "./BottomTabNavigator";
import ExploreEventDetails from '../components/Event/ExploreEventDetails';
import EventScreen from "../screens/Event/EventScreen";
import ExploreEvent from "../components/Event/ExploreEvent";
import RegisteredEvents from "../components/Event/RegisteredEvents";
import RegisteredEventDetails from '../components/Event/RegisteredEventDetails'
import EventPaymentSummary from "../components/Event/EventPaymentSummary";




const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="IntroductionScreen1"
        component={IntroductionScreen1}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="IntroductionScreen2"
        component={IntroductionScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Event"
        component={EventScreen}
       options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Explore Event"
        component={ExploreEvent}
       options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Explore Event Details"
        component={ExploreEventDetails}
       options={{ headerShown: true }}
      />
       <Stack.Screen
        name="Event Payment Summary"
        component={EventPaymentSummary}
       options={{ headerShown: true }}
      />
       <Stack.Screen
        name="Registered Event"
        component={RegisteredEvents}
       options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Registered Event Details"
        component={RegisteredEventDetails}
      options={{ headerShown: true }}
      />
       <Stack.Screen
        name="Upload Files"
        component={UploadFiles}
       options={{ headerShown: false }}
      />
      
       <Stack.Screen
        name="Header"
        component={Header}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default StackNavigator;
