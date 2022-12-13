import React, { useState } from 'react'
import { defaultStyle } from '../../styles/styles'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign } from '@expo/vector-icons'
import { Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Modal, Image } from 'react-native'
import { auth} from '../../firebase/Config'
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
    const [image, setImage] = useState('../../img/empty.jpg'); 
    const username = auth.currentUser?.displayName

    const [amount, setAmount] = useState(0)
    const unit = ["ml", "dl", "l", "mg", "g", "kg", "tl", "rl"]
    const [selectedUnit, setSelectedUnit] = useState("ml")

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

    const addIngredient = () => {
        if (ingredient != "") {
            ingredients.push(amount + " " + selectedUnit + " " + ingredient)
            setIngredient("")
        }
    }

    const addCategory = () => {
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
            username: username
        }).then(() => {
            //data saved
            console.log("data submitted")
        }).catch((error) => {
            //fail
            console.log(error)
        });
        setImage(null)
        setModalVisible(!modalVisible)
        
    }

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            {/* Modal ikkunan sisältö */}
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <ScrollView style={defaultStyle.modalView}>

                        {/* kuva ja nimi vierekkäin */}
                        <View style={[{ flexDirection: "row" }]}>

                            {/* kuvan lisäys */}
                            <View style={{ flex: 1 }} >
                                <TouchableOpacity
                                style={defaultStyle.recipeButtonI}
                                activeOpacity={0.6}
                                onPress={pickImage} >
                                    <ImageLoad
                                        style={{ width: 120, height: 125 }}
                                        source={{uri: image }}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* reseptin nimi */}
                            <View style={{ flex: 1, alignSelf: "center", marginLeft: -8, marginRight: 12 }} >
                                <TextInput value={recipeName} onChangeText={(recipeName) => {setRecipeName(recipeName)}} placeholder=" Reseptin nimi" style={defaultStyle.textInput}></TextInput>
                            </View>
                        </View>
                        
                        {/* ainesosien lisäys */}
                        <View style={defaultStyle.recipeContainer}>
                            <View style={[ { flexDirection: "row" }]}>

                                {/* reseptin nimi */}
                                <TextInput value={ingredient} onChangeText={(ingredient) => {setIngredient(ingredient)}} placeholder=" Ainesosa" style={[defaultStyle.textInput, { flex: 4 }]}></TextInput>

                                <View style={{ flex: 2 }} >
                                    <NumericInput value={amount} totalWidth={60} totalHeight={50} type="up-down" onChange={amount => setAmount(amount)} minValue={0} rounded style={{width: 6}} />
                                </View>
                                <View style={{ flex: 2 }} >
                                    <SelectDropdown
                                        data={unit}
                                        defaultValueByIndex={0}
                                        buttonStyle={{width: 60}}
                                        buttonTextStyle={{textAlign: "center"}}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                            setSelectedUnit(selectedItem)
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
                                <View style={{ flex: 1, justifyContent: "center" }} >
                                    <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={addIngredient} >
                                        <Entypo name={'circle-with-plus'} size={32} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                {ingredients.map((ingredients, index) => (
                                    <View style={[{flexDirection: "row", paddingLeft: 12, paddingTop: 8, borderBottomWidth: 2}]}>
                                        <Text key={index}>{ingredients}</Text>
                                        <Pressable>
                                            <Entypo name={'circle-with-cross'}  size={32} /* onPress={removeIngredient} */  />
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* kategorioiden lisäys lisäys */}
                        <View style={defaultStyle.recipeContainer}>
                            <View style={[{ flexDirection: "row" }]}>

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
                                {categories.map((category, index) => (
                                     <View style={[{flexDirection: "row", paddingLeft: 12, paddingTop: 8, borderBottomWidth: 2}]}>
                                        <Text key={index}>{category}</Text>
                                        <Pressable>
                                        <Entypo name={'circle-with-cross'} size={32} /* onPress={removeIngredient} */  />
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* reseptin ohje */}
                        <TextInput value={instructions} multiline={true} onChangeText={(instructions) => {setInstructions(instructions)}} placeholder=" Ohje" style={[defaultStyle.textInput, {height: 160, marginLeft: 12, marginRight: 12, marginTop: 12, marginBottom: 12}]}></TextInput>

                        {/* ok ja cancel napit */}
                        <View style={[defaultStyle.recipeContainerI, { flexDirection: "row", marginBottom: 12}]}>
                            {/* peruuta */}
                            <TouchableOpacity
                            style={[{flex: 1, justifyContent:"center", alignContent:"center", alignItems: "center"}]}
                            activeOpacity={0.6}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Entypo name={'circle-with-cross'} size={68} color="red" /* onPress={removeIngredient} */  />
                            </TouchableOpacity>

                            {/* lähetä resepti */}
                            <TouchableOpacity
                            style={[{flex: 1, alignItems: "center"}]}
                            activeOpacity={0.6}
                            onPress={create} >
                                <AntDesign name="checkcircle" size={64} color="green" />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </Modal>
            
            {/* avaa Modal ikkunan missä on reseptin lisääminen*/}
            <TouchableOpacity
            style={defaultStyle.floatButton}
            activeOpacity={0.6}
            onPress={() => setModalVisible(true)}
            >
                
                <AntDesign name="plus" size={34} color="white" />

            </TouchableOpacity>

        </ScrollView>
    )
}

export default AddRecipe