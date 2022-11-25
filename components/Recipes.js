import React, { useState, useEffect } from 'react'
import { defaultStyle } from '../styles/styles'
import Entypo from '@expo/vector-icons/Entypo'
import { Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Modal, Image } from 'react-native'
import { db, storage, RECIPES_REF } from '../firebase/Config'
import { RecipeItem } from './RecipeItem'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import * as ImagePicker from "expo-image-picker"


export function Recipes () {

    const [allRecipes, setAllRecipes] = useState([])

    const [recipeName, setRecipeName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null);
    const [imageUrl, setImageURL] = useState('')

   

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setImage(result.uri);
    };

    const uploadImage = async () => {
        const storageRef = ref(storage, (recipeName+".jpg"));
        const img = await fetch(image)
        const bytes = await img.blob()
        await uploadBytes(storageRef, bytes)

        getDownloadURL(ref(storage, (recipeName+'.jpg')))
        .then((url) => {
            setImageURL(url)
        });
    }

    function addIngredient() {
        ingredients.push(ingredient)
        setIngredient("")
    }

    function addCategory() {
        categories.push(category)
        setCategory("")
    }

    useEffect(() => {
        getDocs(collection(db, RECIPES_REF)).then(docSnap => {
            let recipes = [];
            docSnap.forEach((doc) => {
                recipes.push({ ...doc.data(), id:doc.id })
            })
            setAllRecipes(recipes)
        })
    }, [])
    
    function create() {
        addCategory()
        addIngredient()
        uploadImage()
        // submit data
        addDoc(collection(db, RECIPES_REF), {
            recipename: recipeName,
            instructions: instructions,
            categories: categories,
            ingredients: ingredients,
            piclink: imageUrl
        }).then(() => {
            //data saved
            console.log("data submitted")
        }).catch((error) => {
            //fail
            console.log(error)
        });
        setModalVisible(!modalVisible)
    }

        //haku kriteerillä
    /*function readQuery() {
        getDocs(query(collection(db, RECIPES_REF), where("categories","=",{kategorialla haku}))).then(docSnap => {
            let users = [];
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id:doc.id })
            })
            console.log(recipes.data())
        })
    } */

    let recipeKeys = Object.keys(allRecipes)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <ScrollView style={defaultStyle.modalView}>

                        {/* Modal ikkunan sisältö */}
                        <TextInput value={recipeName} onChangeText={(recipeName) => {setRecipeName(recipeName)}} placeholder="Recipe Name" style={defaultStyle.textInput}></TextInput>

                        {/* kuvan lisäys */}
                        <TouchableOpacity
                        style={defaultStyle.button}
                        activeOpacity={0.6}
                        onPress={pickImage} >
                            <Text style={defaultStyle.buttonText}>Pick picture</Text>
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                        <TextInput value={instructions} multiline={true} onChangeText={(instructions) => {setInstructions(instructions)}} placeholder="Recipe instructions" style={defaultStyle.textInput}></TextInput>

                        <TextInput value={category} onChangeText={(category) => {setCategory(category)}} placeholder="Category" style={defaultStyle.textInput}></TextInput>
                        <View>
                            {categories.map((category) => (
                                <View>
                                    <Text>{category}</Text>
                                    <Pressable>
                                        <Entypo name={'trash'} size={32} /* onPress={onRemove} */ />
                                    </Pressable>
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
                            {ingredients.map((ingredient) => (
                                <View>
                                    <Text>{ingredient}</Text>
                                    <Pressable>
                                        <Entypo name={'trash'} size={32} /* onPress={onRemove} */ />
                                    </Pressable>
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
                        onPress={create} >
                            <Text style={defaultStyle.buttonText}>Submit recipe</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={defaultStyle.button}
                        activeOpacity={0.6}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={defaultStyle.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
            {/* avaa Modal ikkunan missä on reseptin lisääminen*/}
            <TouchableOpacity
            style={defaultStyle.button}
            activeOpacity={0.6}
            onPress={() => setModalVisible(true)}
            >
                <Text style={defaultStyle.buttonText}>Add a new recipe</Text>
            </TouchableOpacity>

            {/* näyttää kaikki reseptit */}
            <ScrollView>
                {recipeKeys.length > 0 ? (
                recipeKeys.map(key => (
                    <View>
                        <RecipeItem key={key} id={key} recipeItem={allRecipes[key]} />
                    </View>
                ))
                ) : (
                <Text>There are no items</Text>
                )}
            </ScrollView>
        </ScrollView>
    )
}

export default Recipes