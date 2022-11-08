import { child, onValue, push, ref, remove, update } from "firebase/database"
import React, { useState, useEffect } from "react"
import {defaultStyle} from '../styles/styles'
import Entypo from "@expo/vector-icons/Entypo"
import { Text, TextInput, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { db, RECIPES_REF } from "../firebase/Config";

export function AddRecipe() {
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

    return (
        
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

            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={addNewRecipe}>
            <Text style={defaultStyle.buttonText}>Add a new recipe</Text>
            </TouchableOpacity>
            </View>
        </View>
        </React.Fragment>
    )
}

export default AddRecipe