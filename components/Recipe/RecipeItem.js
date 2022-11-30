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
        <Image
          source={{ uri: picture }}
          //väliaikanen style, ei näkynyt ilman mitään styleä
          style={{ width: 400, height: 400, margin: 16 }}
        />
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