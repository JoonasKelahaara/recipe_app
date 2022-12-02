import React, { useState } from 'react'
import { defaultStyle } from '../../styles/styles'
import Entypo from '@expo/vector-icons/Entypo'
import { Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native'
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown'
import ImageLoad from 'react-native-image-placeholder';
import { db, storage, RECIPES_REF } from '../../firebase/Config'
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import * as ImagePicker from "expo-image-picker"
import placeholder from "../../img/empty.jpg"


export function AddRecipe () {

    const [recipeName, setRecipeName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(placeholder); 

    const [amount, setAmount] = useState(0)
    const unit = ["ml", "dl", "l", "mg", "g", "kg", "tl", "rl"]

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
        }).then(() => {
            //data saved
            console.log("data submitted")
        }).catch((error) => {
            //fail
            console.log(error)
        });
        setImage(null)
    }

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            {/* Modal ikkunan sisältö */}
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <ScrollView style={defaultStyle.modalView}>

                        {/* kuva ja nimi vierekkäin */}
                        <View style={[defaultStyle.recipeContainer, { flexDirection: "row" }]}>

                            {/* kuvan lisäys */}
                            <View style={{ flex: 1 }} >
                                <TouchableOpacity
                                style={defaultStyle.recipeButton}
                                activeOpacity={0.6}
                                onPress={pickImage} >
                                    <ImageLoad
                                        style={{ width: 120, height: 125 }}
                                        placeholderSource={require('../../img/empty.jpg')}
                                        source={image}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* reseptin nimi */}
                            <View style={{ flex: 1, alignSelf: "center" }} >
                                <TextInput value={recipeName} onChangeText={(recipeName) => {setRecipeName(recipeName)}} placeholder=" Reseptin nimi" style={defaultStyle.textInput}></TextInput>
                            </View>
                        </View>
                        
                        
                        {/* ainesosien lisäys */}
                        <View style={[defaultStyle.recipeContainer, { flexDirection: "row" }]}>

                            {/* reseptin nimi */}
                            <TextInput value={ingredient} onChangeText={(ingredient) => {setIngredient(ingredient)}} placeholder=" Ainesosa" style={[defaultStyle.textInput, { flex: 1 }]}></TextInput>

                            <View style={{ flex: 1 }} >
                                <NumericInput value={amount} type="up-down" onChange={amount => setAmount(amount)} minValue={0} rounded  />
                            </View>
                            <View style={{ flex: 1 }} >
                                <SelectDropdown
                                    data={unit}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </View>
                        </View>

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
                        style={defaultStyle.recipeButton}
                        activeOpacity={0.6}
                        onPress={addIngredient} >
                            <Text style={defaultStyle.buttonText}>Vahvista ainesosa</Text>
                        </TouchableOpacity>


                        {/* kategorioiden lisäys lisäys */}
                        <View style={[defaultStyle.recipeContainer, { flexDirection: "row" }]}>

                            <TextInput value={category} onChangeText={(category) => {setCategory(category)}} placeholder=" Kategoria" style={[defaultStyle.textInput, { flex: 1 }]}></TextInput>

                            <TouchableOpacity
                            style={defaultStyle.recipeButton}
                            activeOpacity={0.6}
                            onPress={addCategory} >
                                <Text style={defaultStyle.buttonText}>Add category</Text>
                            </TouchableOpacity>
                        </View>

                        {/* näyttää valitut kategoriat */}
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








                        {/* reseptin ohje */}
                        <TextInput value={instructions} multiline={true} onChangeText={(instructions) => {setInstructions(instructions)}} placeholder=" Ohje" style={[defaultStyle.textInput, {height: 160}]}></TextInput>


                        <View style={[defaultStyle.recipeContainer, { flexDirection: "row"}]}>
                            {/* peruuta */}
                            <TouchableOpacity
                            style={[defaultStyle.recipeButton, {flex: 1}]}
                            activeOpacity={0.6}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={defaultStyle.buttonText}>Punainen rasti</Text>
                            </TouchableOpacity>

                            {/* lähetä resepti */}
                            <TouchableOpacity
                            style={[defaultStyle.recipeButton, {flex: 1}]}
                            activeOpacity={0.6}
                            onPress={create} >
                                <Text style={defaultStyle.buttonText}>Vihreä väkänen</Text>
                            </TouchableOpacity>
                        </View>

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

        </ScrollView>
    )
}

export default AddRecipe