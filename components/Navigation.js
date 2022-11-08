import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'
import Home from './Home'
import Test from './Test'

function HomeScreen() {
    return(
        <Home />
    )
}

function TestScreen() {
    return(
        <Test />
    )
  }

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused,color,size}) => {
              let iconName;
              let iconColor;
              let iconSize = 20;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home',
                iconColor = focused ? 'black' : 'gray'
              } else if (route.name === "Test") {
                iconName = focused ? 'checkcircle' : 'checkcircleo'
                iconColor = focused ? 'black' : 'gray'
              }

              return <AntDesign name={iconName} size={iconSize} color={iconColor} />
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveBackgroundColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {position: 'absolute'}
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Test" component={TestScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
}