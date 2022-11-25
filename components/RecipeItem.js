import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign } from '@expo/vector-icons'
import { Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Modal, Image } from 'react-native'
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db, RECIPES_REF } from '../firebase/Config'
import { defaultStyle } from '../styles/styles.js'

export const RecipeItem = ({recipeItem: { recipename: recipeName, instructions: instructions, categories: categories, ingredients: ingredients, piclink: picture, id: id }}) => {

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
    setModalVisible(!modalVisible)
  }

  function addIngredient() {
    ingredientsUpdate.push(ingredient)
    setIngredient("")
  }

  function addCategory() {
      categoriesUpdate.push(category)
      setCategory("")
  }

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={defaultStyle.recipeItem}>

      <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
          <View>
              <View style={defaultStyle.modalView}>

                  {/* Modal ikkunan sisältö */}
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

                  <TouchableOpacity
                  style={defaultStyle.button}
                  activeOpacity={0.6}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                      <Text style={defaultStyle.buttonText}>Cancel</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>


      {/* näkyvä resepti */}
      <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
      <Text>Instructions:</Text>
      <Text>{instructions}</Text>
      <Text>Categories:</Text>
      <ScrollView>{categoryList}</ScrollView>
      <Text>Ingredients:</Text>
      <ScrollView>{ingredientList}</ScrollView>
      <Pressable>
        <Entypo name={'trash'} size={32} onPress={remove}/>
      </Pressable>
      <Pressable>
        <AntDesign name="setting" size={32} color="black" onPress={() => setModalVisible(true)}/>
      </Pressable>
    </View>
  )
}

export default RecipeItem