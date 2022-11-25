import React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { defaultStyle } from '../../styles/styles.js'

export const RecipeItem = ({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, piclink: picture, id: id }}) => {

  const ingredientList = ingredients.map((ingredient) => (
    <Text key={ingredient}>{ingredient}</Text>
  ))

  const categoryList = categories.map((category) => (
    <Text key={category}>{category}</Text>
  ))

  return (
    <ScrollView style={defaultStyle.recipeItem}>
      <View >
        <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
        <Image source={{uri: picture}}></Image>
        <Text />
        <Text>Ohjeet:</Text>
        <Text>{instructions}</Text>
        <Text />
        <Text>Kategoriat:</Text>
        <ScrollView>{categoryList}</ScrollView>
        <Text />
        <Text>Ainesosat:</Text>
        <ScrollView>{ingredientList}</ScrollView>
      </View>
    </ScrollView>
  )
}

export default RecipeItem