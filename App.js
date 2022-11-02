import { Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
import {defaultStyle} from './styles/styles.js'
import React, { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'


//database hommeja
import { child, onValue, push, ref, remove, update } from "firebase/database"
import { db, RECIPES_REF } from "./firebase/Config"
import { RecipeItem } from './components/RecipeItem';

export default function App() {

  //databs
  const [newRecipe, setNewRecipe] = useState("");
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
        recipeItem: newRecipe
      };
      const newRecipeItemKey = push(child(ref(db), RECIPES_REF)).key;
      const updates = {};
      updates[RECIPES_REF + newRecipeItemKey] = newRecipeItem;
      setNewRecipe("");
      return update(ref(db), updates);
    }
  }

  const removeRecipes = () => {
    remove(ref(db), RECIPES_REF);
  }

  const createTwoButtonAlert = () => Alert.alert(
    "todolist", "remove all items?", [{
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
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
      <Footer />
    </View>
  );
}