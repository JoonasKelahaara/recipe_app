import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign } from '@expo/vector-icons'
import { Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Modal, Image } from 'react-native'
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db, RECIPES_REF } from '../../firebase/Config'
import { defaultStyle } from '../../styles/styles.js'

export const UpdateRecipe = ({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, piclink: picture, id: id }}) => {

  const [ingredient, setIngredient] = useState('')
  const [ingredientsUpdate, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const [categoriesUpdate, setCategories] = useState([])

  const ingredientList = ingredients.map(ingredient => (
    <Text key={ingredients.id}>{ingredient}</Text>
  ))
  const categoryList = categories.map(category => (
    <Text key={categories.id}>{category}</Text>
  ))

  const remove = () => {
    deleteDoc(doc(db, RECIPES_REF, id))
    console.log("pressed", id)
  }

  const update = () => {
    addCategory()
    addIngredient()
    // submit data
    updateDoc(doc(db, RECIPES_REF, id), {
        recipename: recipeName,
        instructions: instructions,
        categories: categoriesUpdate,
        ingredients: ingredientsUpdate,
        piclink: picture
    }).then(() => {
        //data saved
        console.log("data submitted")
    }).catch((error) => {
        //fail
        console.log(error)
    });
  }

    function addIngredient() {
        if (ingredient != "") {
            ingredients.push(ingredient)
            setIngredient("")
        }
    }

    function addCategory() {
        if (category != "") {
            categories.push(category)
            setCategory("")
        }
    }

  return (
    <View style={defaultStyle.recipeItem}>
        <TextInput value={recipeName} onChangeText={(recipeName) => {setRecipeName(recipeName)}} placeholder="Recipe Name" style={defaultStyle.textInput}></TextInput>
        <Image source={{ uri: picture }} />
        <TextInput value={instructions} multiline={true} onChangeText={(instructions) => {setInstructions(instructions)}} placeholder="Recipe instructions" style={defaultStyle.textInput}></TextInput>
        <TextInput value={category} onChangeText={(category) => {setCategory(category)}} placeholder="Category" style={defaultStyle.textInput}></TextInput>
        <View>
            {categoriesUpdate.map((category) => (
                <View>
                    <Text>{category}</Text>
                </View>
            ))}
        </View>
        <TouchableOpacity
        style={defaultStyle.button}
        activeOpacity={0.6}
        onPress={addCategory} >
            <Text style={defaultStyle.buttonText}>Add category</Text>
        </TouchableOpacity>

        <TextInput value={ingredient} onChangeText={(ingredient) => {setIngredient(ingredient)}} placeholder="Ingredient" style={defaultStyle.textInput}></TextInput>
        <View>
            {ingredientsUpdate.map((ingredient) => (
                <View>
                    <Text>{ingredient}</Text>
                </View>
            ))}
        </View>
        <TouchableOpacity
        style={defaultStyle.button}
        activeOpacity={0.6}
        onPress={addIngredient} >
            <Text style={defaultStyle.buttonText}>Add ingredient</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={defaultStyle.button}
        activeOpacity={0.6}
        onPress={update} >
            <Text style={defaultStyle.buttonText}>Update recipe</Text>
        </TouchableOpacity>
    </View>
  )
}

export default UpdateRecipe