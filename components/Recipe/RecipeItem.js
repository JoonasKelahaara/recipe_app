import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import ImageLoad from 'react-native-image-placeholder';
import { db, storage, RECIPES_REF } from '../../firebase/Config'
import { ref, getDownloadURL } from "firebase/storage";
import { defaultStyle } from '../../styles/styles.js'
import LikeRecipe from './LikeRecipe';
import placeholder from "../../img/logo.png"


export const RecipeItem = ({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, id: id }}) => {

  const [imageUrl, setImageURL] = useState(null)  
  const [recipeIttem, setRecipeIttem] = useState({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, id: id }})

  const [selectedItem, setSelectedItem] = useState(null)

  function close () {
    setSelectedItem(null)
  }

  const ingredientList = ingredients.map((ingredient, index) => (
    <Text key={index}>{ingredient}</Text>
  ))

  const categoryList = categories.map((category, index) => (
    <Text key={index}>{category}</Text>
  ))

  useEffect(() => {
    getDownloadURL(ref(storage, (recipeName+'.jpg')))
    .then((url) => {
      setImageURL(url)
    });
  }, [])

  console.log(selectedItem)

  return (
    <ScrollView style={defaultStyle.recipeItem}>
      <View>
        {/* kuva */}
        <View>
          { imageUrl? (
          <Image
            source={{ uri: imageUrl}}
            //väliaikanen style, ei näkynyt ilman mitään styleä
            style={{height: 200, resizeMode: "cover", borderTopLeftRadius: 6, borderTopRightRadius: 6}} 
          />
          ): (<Text style={{textAlign:'center'}}>Ei kuvaa saatavilla</Text>)}
        </View>
        {/* nimi */}
        <View>
          <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
          <LikeRecipe />
        </View>
      </View>
    </ScrollView>
  )
}

export default RecipeItem