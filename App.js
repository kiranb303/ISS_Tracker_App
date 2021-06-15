import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Update from './Screens/Update';
import Meteor from './Screens/Meteor';
import ISS_Location from './Screens/ISSLocation';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Home" component = {Home}></Stack.Screen>
      <Stack.Screen name = "ISS_Location" component = {ISS_Location}></Stack.Screen>
      <Stack.Screen name = "Update" component = {Update}></Stack.Screen>
      <Stack.Screen name = "Meteor" component = {Meteor}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
