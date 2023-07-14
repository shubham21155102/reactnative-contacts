import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import codeforces from "./src/screens/codeforces";
import homepage from "./src/screens/homepage";
import login from './src/screens/LogIn';
import practices from "./src/screens/practices";
import upcomingcontest from "./src/screens/upcomingcontest";
import timelimiterrors from "./src/screens/timelimiterrors";
// import Contacts from './src/screens/contacts';
import LocalStorageDemo from './src/screens/addcontacts';
import showAll from './src/screens/allcontacts';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="ShowAll" component={showAll} />
          <Stack.Screen name="contacts" component={LocalStorageDemo} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
