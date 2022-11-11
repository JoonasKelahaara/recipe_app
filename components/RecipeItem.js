import { ref, remove, child, update, onValue, set, push } from "firebase/database";
import React, { useState, useEffect } from "react"
import Entypo from "@expo/vector-icons/Entypo"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Text, ScrollView, Modal, View, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native'
import { db, RECIPES_REF } from "../firebase/Config";
import {defaultStyle} from '../styles/styles.js'

export const RecipeItem = ({recipeItem: {recipeItem: title, instructions: instructions, categories: categories, ingredients: ingredients }, id}) => {

    const ingredientList = ingredients.map((ingredient) =>
        <Text key={ingredients.id}>{ingredient}</Text>
    )
    const categoryList = categories.map((category) =>
            <Text key={categories.id}>{category}</Text>
    )

    const [updateTitle, setUpdateTitle] = useState(title)
    const [updateInstructions, setUpdateInstructions] = useState(instructions)
    const [updateCategories, setUpdateAllCategories] = useState(categories)
    const [updateIngredients, setUpdateAllIngredients] = useState(ingredients)

    const [categoryInput, setCategoryInput] = useState('')
    const [allCategories, setAllCategories] = useState(["",""])
    const [ingredientInput, setIngredientInput] = useState('')
    const [allIngredients, setAllIngredients] = useState([])

    const addCategories = () => {
        setAllCategories(prevCategories => [...prevCategories, categoryInput])
        setCategoryInput('')
      }
    
      const addIngredients = () => {
        setAllIngredients(prevIngredients => [...prevIngredients, ingredientInput])
        setIngredientInput('')
      }

    const updateRecipe = () => {
        const updatedRecipeItem = {
            recipeItem: updateTitle,
            instructions: updateInstructions,
            categories: allCategories,
            ingredients: allIngredients
          }
          return update(ref((db), RECIPES_REF + id), updatedRecipeItem)
    }

    const onRemove = () => {
        return remove(child(
            ref(db), RECIPES_REF + id));
    };

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={defaultStyle.recipeItem}>


        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)
            }}
        >
            <View>
            <View style={styles.modalView}>



                <TextInput style={defaultStyle.textInput} onChangeText={setUpdateTitle}>{title}</TextInput>
                <TextInput style={defaultStyle.textInput} multiline={true} onChangeText={setUpdateInstructions}>{instructions}</TextInput>
                

                <TextInput
                placeholder='add a category'
                value={categoryInput}
                onChangeText={setCategoryInput}
                style={defaultStyle.textInput}
                />
                <TouchableOpacity
                style={defaultStyle.button}
                activeOpacity={0.6}
                onPress={addCategories}
                >
                <Text style={defaultStyle.buttonText}>Add a new category</Text>
                </TouchableOpacity>
                <TextInput
                placeholder='add new ingredient'
                value={ingredientInput}
                onChangeText={setIngredientInput}
                style={defaultStyle.textInput}
                />
                <TouchableOpacity
                style={defaultStyle.button}
                activeOpacity={0.6}
                onPress={addIngredients}
                >
                <Text style={defaultStyle.buttonText}>Add a new ingredient</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={defaultStyle.button}
                activeOpacity={0.6}
                onPress={(updateRecipe)}
                >
                <Text style={defaultStyle.buttonText}>Update Recipe</Text>
                </TouchableOpacity>
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



            <Text style={defaultStyle.recipeTitle} >{title}</Text>
            <Text>{instructions}</Text>
            <ScrollView>{categoryList}</ScrollView>
            <ScrollView>{ingredientList}</ScrollView>
            <Pressable>
                <Entypo name={"trash"} size={32} onPress={(onRemove)} />
            </Pressable>
            <Pressable>
                <MaterialCommunityIcons name={"update"} size={32} onPress={() => setModalVisible(true)} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
      backgroundColor: "white"
    }
  });