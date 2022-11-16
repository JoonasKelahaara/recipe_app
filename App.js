import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {defaultStyle} from './styles/styles.js'
import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'
import Home from './components/Home'
import Recipes from './components/Recipes'
import Header from './components/Header'
import Info from './components/Info'
import Login from './components/Login'
import Profile from './components/Profile'
import Settings from './components/Settings';
import Footer from './components/Footer'




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

  function LoginScreen() {
    return(
      <Login />
    )
  }

  function ProfileScreen() {
    return(
      <Profile navigation="Settings"/>
    )
  }

  function SettingsScreen() {
    return(
      <Settings name="Settings"/>
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
              } else if (route.name === "Login") {
                iconName = focused ? 'login' : 'login',
                iconColor = focused ? '#808080' : 'white'
              } else if (route.name === "Profile") {
                iconName = focused ? 'user' : 'user',
                iconColor = focused ? '#808080' : 'white'
              } else if (route.name === "Settings") {
                iconName = focused ? 'setting' : 'setting',
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
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Recipes" component={RecipeScreen} />
          <Tab.Screen name ="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{
            tabBarButton: () => null,
            tabBarVisible: false
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" backgroundColor="#92C591" />
    </View>
  );
}