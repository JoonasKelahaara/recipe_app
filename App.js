import { Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {defaultStyle} from './styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React, { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Test from './components/Test'


//database hommeja
import { child, onValue, push, ref, remove, update } from "firebase/database"
import { db, RECIPES_REF } from "./firebase/Config"
import { RecipeItem } from './components/RecipeItem';

export default function App() {

  //databs
  const [newRecipe, setNewRecipe] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const recipeItemsRef = ref(db, RECIPES_REF);
    onValue(recipeItemsRef, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const recipeItems = {...data};
      setRecipes(recipeItems);
    });
  }, []);

  const addNewRecipe = () => {
    if (newRecipe.trim() !== "") {
      const newRecipeItem = {
        recipeItem: newRecipe,
        instructions: instructions,
        categories: allCategories,
        ingredients: allIngredients
      };
      const newRecipeItemKey = push(child(ref(db), RECIPES_REF)).key;
      const updates = {};
      updates[RECIPES_REF + newRecipeItemKey] = newRecipeItem;
      setNewRecipe("");
      setCategoryInput("")
      setAllCategories([])
      setIngredientInput("")
      setInstructions("")
      return update(ref(db), updates);
    }
  }

  const addCategories = () => {
    setAllCategories((prevCategories) => [
      ...prevCategories,
      categoryInput
    ])
    setCategoryInput("")
  }

  const addIngredients = () => {
    setAllIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredientInput
    ])
    setIngredientInput("")
  }

  const removeRecipes = () => {
    remove(ref(db), RECIPES_REF);
  }

  const createTwoButtonAlert = () => Alert.alert(
    "todolist", "remove all items?", [{
      text: "Cancel",
      style: "cancel"
    },
    {
      text: "OK",
      onPress: () => removeRecipes()
    }],
    { cancelable: false }
  );

  let recipesKeys = Object.keys(recipes);
  //databs päättyy

  //Navihommia
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

  //navihommat päättyy


  return (
    <View style={defaultStyle.container}>
      <Header />

      {/* väliaikasesti tässä tuo näkyvä osa databasesta. tuntuu toimivan reseptin lisäys ja kaikkien reseptien poisto. atm vain reseptin nimi on kirjattuna */}
      <React.Fragment>
        <View>
          <Text>Recipes ({recipesKeys.length})</Text>
          <View>
            <TextInput
              placeholder="add new recipe"
              value={newRecipe}
              onChangeText={setNewRecipe}
            />
            <TextInput
              placeholder="add instructions"
              value={instructions}
              onChangeText={setInstructions}
            />
            <TextInput
              placeholder="add a category"
              value={categoryInput}
              onChangeText={setCategoryInput}
            />
            <Button
              title="Add new a new category"
              onPress={addCategories}
            />
            <TextInput
              placeholder="add new ingredient"
              value={ingredientInput}
              onChangeText={setIngredientInput}
            />
            <Button
              title="Add new a new ingredient"
              onPress={addIngredients}
            />
          </View>
          <View>
            <Button
              title="Add new recipe item"
              onPress={() => addNewRecipe()}
            />
            <ScrollView>
              {recipesKeys.length > 0 ? (
                recipesKeys.map(key => (
                  <RecipeItem
                    key={key}
                    id={key}
                    recipeItem={recipes[key]} 
                  />
              ))
              ) : (
                <Text>There are no items</Text>
              )}
              <View>
                <Button
                title="Remove all recipes"
                onPress={() => createTwoButtonAlert()}
              />
              </View>
            </ScrollView>
          </View>
        </View>
      </React.Fragment>
      {/* reseptien lisäys, näkymä ja poisto */}

      <Text>Tähän kaikki komponentit ja semmoset siistit jutut, Navi joko tän yläpuolelle tai sit alimmaksi</Text>
      {/* Navi alkaa */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused,color,size}) => {
              let iconName;
              let iconColor;
              let iconSize = 20;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home',
                iconColor = focused ? 'gray' : 'black'
              } else if (route.name === "Test") {
                iconName = focused ? 'checkcircle' : 'checkcircleo'
                iconColor = focused ? 'gray' : 'black'
              }

              return <AntDesign name={iconName} size={iconSize} color={iconColor} />
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveBackgroundColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute'
            }
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Test" component={TestScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
      {/* Navi loppuu */}
      <Footer />
    </View>
  );
}