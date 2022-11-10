import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React, { useState, useEffect } from "react"
import Footer from './Footer'

//database hommeja
import { onValue, ref} from "firebase/database"
import { db, RECIPES_REF } from "../firebase/Config"
//componentti reseptien näyttämiseen
import { RecipeItem } from './RecipeItem';
//componentti reseptien lisäämiseen
import { AddRecipe } from "./AddRecipe"

export default function Test() {

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

    return(
    <ScrollView style={defaultStyle.navMargin}>
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
    </ScrollView>
    )
}