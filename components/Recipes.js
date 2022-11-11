import { Text, ScrollView, Modal, View, TouchableOpacity, StyleSheet } from 'react-native'
import { defaultStyle } from '../styles/styles.js'
import React, { useState, useEffect } from 'react'

//database hommeja
import { onValue, ref } from 'firebase/database'
import { db, RECIPES_REF } from '../firebase/Config'
//componentti reseptien näyttämiseen
import { RecipeItem } from './RecipeItem'
//componentti reseptien lisäämiseen
import { AddRecipe } from './AddRecipe'

export default function Test () {
  //databs

  const [recipes, setRecipes] = useState({})

  useEffect(() => {
    const recipeItemsRef = ref(db, RECIPES_REF)
    onValue(recipeItemsRef, snapshot => {
      const data = snapshot.val() ? snapshot.val() : {}
      const recipeItems = { ...data }
      setRecipes(recipeItems)
    })
  }, [])

  let recipeKeys = Object.keys(recipes)
  //databs päättyy

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ScrollView style={defaultStyle.navMargin}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View>
          <View style={styles.modalView}>
            <AddRecipe />
            <TouchableOpacity
              style={defaultStyle.button}
              activeOpacity={0.6}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={defaultStyle.buttonText}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={defaultStyle.button}
        activeOpacity={0.6}
        onPress={() => setModalVisible(true)}
      >
        <Text style={defaultStyle.buttonText}>Add a new recipe</Text>
      </TouchableOpacity>
      <ScrollView>
        {recipeKeys.length > 0 ? (
          recipeKeys.map(key => (
            <RecipeItem key={key} id={key} recipeItem={recipes[key]} />
          ))
        ) : (
          <Text>There are no items</Text>
        )}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white"
  }
});