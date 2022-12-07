import { LogBox, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {defaultStyle} from './styles/styles.js'
import React, {useState, useEffect} from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'
import Home from './components/Home'
import Recipes from './components/Recipes'
import Header from './components/Header'
import Info from './components/Info'
import Signin from './components/Signin'
import Login from './components/Login'
import Profile from './components/Profile'
import Settings from './components/Settings';
import Favourites from './components/Favourites'
import Security from './components/Tietosuoja'
import Support from './components/Support'
import Terms from './components/Terms'
import { auth } from './firebase/Config'
import { onAuthStateChanged } from 'firebase/auth';
import Footer from './components/Footer'

//poistaa ilmoituksen "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"
LogBox.ignoreLogs(["AsyncStorage"])

export default function App() {

  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

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
        <Info name="Settings" name2='Support' name3="Terms" name4="Security" />
      )
  }

  function LoginScreen() {
    return(
      <Login name="Signin" name2="Home" />
    )
  }

  function SigninScreen() {
    return (
      <Signin name="Login" name2="Home"/>
    )
  }

  function ProfileScreen() {
    return(
      <Profile name="Login"/>
    )
  }

  function SettingsScreen() {
    return(
      <Settings name="Info"/>
    )
  }

  function FavouritesScreen() {
    return (
      <Favourites />
    )
  }

  function SecurityScreen() {
    return (
    <Security name="Info" />
    )
  }

  function SupportScreen() {
    return (
    <Support name="Info" />
    )
  }


  function TermsScreen() {
    return (
    <Terms name="Info" />
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

              if (route.name === "Recipes") {
                iconName = focused ? 'search1' : 'search1'
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
              } else if (route.name === "Favourites") {
                iconName = focused ? 'heart' : 'hearto',
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
            {!user ?  (
          <Tab.Group>
          {/* Tänne kaikki Login screenit */}
            <Tab.Screen name="Login" component={LoginScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              tabBarStyle: {display: 'none'}
            }} />
            <Tab.Screen name="Signin" component={SigninScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              tabBarStyle: {display: 'none'}
            }}/>
          </Tab.Group> ) : (
          <Tab.Group>
            {/* Tänne kaikki sovelluksen screenit */}
            <Tab.Screen name="Info" component={InfoScreen} />
            <Tab.Screen name="Recipes" component={RecipeScreen} />
            <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarIcon: ({focused}) => {
                let iconName;
                let iconColor;
                iconName = focused ? 'home' : 'home'
                iconColor = focused ? '#808080' : 'white'
                return (
                  <View style={{position:'absolute', 
                                bottom: 0, 
                                backgroundColor: '#92C591', 
                                height: 70, width: 70, 
                                alignItems: 'center', justifyContent: 'center', 
                                borderRadius: 90, borderWidth: 2, borderColor: 'white'}}>
                    <AntDesign name={iconName} color={iconColor} size={46} />
                  </View>
                )
              }
            }} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name ="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              tabBarStyle: {display: 'none'}
            }}/>
            <Tab.Screen name="Security" component={SecurityScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
            }}/>
            <Tab.Screen name="Terms" component={TermsScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
            }}/>
            <Tab.Screen name="Support" component={SupportScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
            }}/>
          </Tab.Group> )}
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" backgroundColor="#92C591" />
    </View>
  );
}