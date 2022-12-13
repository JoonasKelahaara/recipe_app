import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import ImageLoad from 'react-native-image-placeholder';
import { db, storage, RECIPES_REF } from '../../firebase/Config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { defaultStyle } from '../../styles/styles.js'
import LikeRecipe from './LikeRecipe';
import placeholder from "../../img/logo.png"


export const RecipeItem = ({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, id: id }}) => {

  const [imageUrl, setImageURL] = useState(null)  

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

  return (
    <ScrollView style={defaultStyle.recipeItem}>
      <View >
        <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
        { imageUrl? (
        <Image
          source={{ uri: imageUrl} || {placeholder}}
          //väliaikanen style, ei näkynyt ilman mitään styleä
          style={{ width: 400, height: 400, margin: 16 }}
        />
      ): (<Text style={{textAlign:'center'}}>Ei kuvaa saatavilla</Text>)}
        <Text />
        <Text>Ohjeet:</Text>
        <Text>{instructions}</Text>
        <Text />
        <Text>Kategoriat:</Text>
        <ScrollView>{categoryList}</ScrollView>
        <Text />
        <Text>Ainesosat:</Text>
        <ScrollView>{ingredientList}</ScrollView>
        <LikeRecipe />
      </View>
    </ScrollView>
  )
}

export default RecipeItem