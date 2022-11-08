import { Text, TextInput, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import {defaultStyle} from './styles/styles.js'
import React, { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

//database hommeja
import { onValue, ref} from "firebase/database"
import { db, RECIPES_REF } from "./firebase/Config"
//componentti reseptien näyttämiseen
import { RecipeItem } from './components/RecipeItem';
//componentti reseptien lisäämiseen
import { AddRecipe } from "./components/AddRecipe"

export default function App() {

  //databs

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const recipeItemsRef = ref(db, RECIPES_REF);
    onValue(recipeItemsRef, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const recipeItems = {...data};
      setRecipes(recipeItems);
    });
  }, []);

  let recipeKeys = Object.keys(recipes);
  //databs päättyy

  return (
    <View style={defaultStyle.container}>
    <ScrollView>
      <Header />
      <AddRecipe />

        <ScrollView>
          {recipeKeys.length > 0 ? (
            recipeKeys.map(key => (
              <RecipeItem
                key={key}
                id={key}
                recipeItem={recipes[key]} 
              />
          ))
          ) : (
            <Text>There are no items</Text>
          )}
        </ScrollView>
        
      <Footer />
    </ScrollView>
      <View style={defaultStyle.navBar}>
        <Navigation />
      </View>
    </View>
  );
}