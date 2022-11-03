import { Text, TextInput, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import {defaultStyle} from './styles/styles.js'
import React, { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

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

  return (
    <View style={defaultStyle.container}>
    <ScrollView>
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
              style={defaultStyle.textInput}
            />
            <TextInput
              placeholder="add instructions"
              value={instructions}
              onChangeText={setInstructions}
              style={defaultStyle.textInput}
            />
            <TextInput
              placeholder="add a category"
              value={categoryInput}
              onChangeText={setCategoryInput}
              style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={addCategories}>
              <Text style={defaultStyle.buttonText}>Add a new category</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="add new ingredient"
              value={ingredientInput}
              onChangeText={setIngredientInput}
              style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={addIngredients}>
              <Text style={defaultStyle.buttonText}>Add a new ingredient</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={() => addNewRecipe}>
              <Text style={defaultStyle.buttonText}>Add a new recipe</Text>
            </TouchableOpacity>
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
              <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={() => createTwoButtonAlert()}>
              <Text style={defaultStyle.buttonText}>Remove all recipes</Text>
            </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </React.Fragment>
      {/* reseptien lisäys, näkymä ja poisto */}

      <Footer />
    </ScrollView>
      <View style={defaultStyle.navBar}>
        <Navigation />
      </View>
    </View>
  );
}