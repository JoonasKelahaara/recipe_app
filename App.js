import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {defaultStyle} from './styles/styles.js'
import React, { useState, useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'
import Home from './components/Home'
import Recipes from './components/Recipes'
import Header from './components/Header'
import Info from './components/Info'
import Footer from './components/Footer'

//database hommeja
import { onValue, ref} from "firebase/database"
import { db, RECIPES_REF } from "./firebase/Config"
//componentti reseptien näyttämiseen
import { RecipeItem } from './components/RecipeItem';
//componentti reseptien lisäämiseen
import { AddRecipe } from "./components/AddRecipe"

export default function App() {

  function HomeScreen() {
    return(
        <Home />
    )
  }

  function RecipeScreen() {
      return(
          <Recipes />
      )
    }

  function InfoScreen() {
      return(
        <Info />
      )
  }

  const Tab = createBottomTabNavigator();

  return (
    <View style={defaultStyle.container}>
      <Header />
        <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={({route}) => ({
            tabBarIcon: ({focused,color,size}) => {
              let iconName;
              let iconColor;
              let iconSize = 24;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home',
                iconColor = focused ? '#808080' : 'white'
              } else if (route.name === "Recipes") {
                iconName = focused ? 'rest' : 'rest'
                iconColor = focused ? '#808080' : 'white'
              } else if (route.name === "Info") {
                iconName = focused ? 'infocirlceo' : 'infocirlceo'
                iconColor = focused ? '#808080' : 'white'
              }

              return <AntDesign name={iconName} size={iconSize} color={iconColor} />
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveBackgroundColor: '#92C591',
            tabBarActiveBackgroundColor: '#92C591',
            tabBarShowLabel: false,
            tabBarStyle: {position: 'absolute'},
            headerShown: false,
          })}
        >
          <Tab.Screen name="Info" component={InfoScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Recipes" component={RecipeScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" backgroundColor="#92C591" />
    </View>
  );
}