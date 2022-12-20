import React, { useState, useEffect } from 'react'
import { defaultStyle } from '../../styles/styles'
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Pressable, Image } from 'react-native'
import { db, storage,  RECIPES_REF, auth } from '../../firebase/Config'
import { collection, getDocs, where, query } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useRoute } from '@react-navigation/native';

import { RecipeItemUpdate } from './RecipeItemUpdate'
import { useIsFocused } from '@react-navigation/native';
import RecipeItem from "./RecipeItem"
import LikeRecipe from "./LikeRecipe"

export function QueryRecipe () {
    const username = auth.currentUser?.displayName
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('Ei reseptejä')
    const [category, setCategory] = useState('categories')
    const [value, setValue] = useState(username)
    const isFocused = useIsFocused();
    const [selectedItem, setSelectedItem] = useState(null)
    const [imageUrl, setImageURL] = useState(null)

    function close () {
        setSelectedItem(null)
        setImageURL(null)
    }

    const route = useRoute();

    const [allRecipes, setAllRecipes] = useState([])

    const q = query(collection(db, RECIPES_REF), where(route.params.category , route.params.search , route.params.value))

    useEffect( () => {
        setLoading(true)
        setAllRecipes([])
        getDocs(q).then(docSnap => {
            let recipes = [];
            docSnap.forEach((doc) => {
                recipes.push({ ...doc.data(), id:doc.id })
            })
            setLoading(false)
            setAllRecipes(recipes)
        })
    }, [isFocused])

    let recipeKeys = Object.keys(allRecipes)

    if (route.params.screen === "omat") {
        return (
            <ScrollView style={defaultStyle.navMargin}>
                {/* näyttää kaikki reseptit */}
                <ScrollView>
                    <ActivityIndicator animating={loading} size='large' color='grey' />
                    {recipeKeys.length > 0 ? (
                    recipeKeys.map(key => (
                        <View>
                            <RecipeItemUpdate key={key} id={key} recipeItem={allRecipes[key]} />
                        </View>
                    ))
                    ) : (
                    <Text>{message}</Text>
                    )}
                </ScrollView>
            </ScrollView>
        )
    } else {
        if (selectedItem != null) {
            const ingredientList = selectedItem.ingredients.map((ingredient, index) => (
            <Text key={index}>⬤ {ingredient}</Text>
        ))
    
        const categoryList = selectedItem.categories.map((category, index) => (
            <Text key={index}>⬤ {category}</Text>
        ))

        getDownloadURL(ref(storage, (selectedItem.recipename+'.jpg')))
        .then((url) => {
        setImageURL(url)
        });
        return (
            <ScrollView style={defaultStyle.navMargin}>
                <View style={defaultStyle.recipeItem}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={defaultStyle.infoLine} />
                        <Text style={defaultStyle.infoHeader}>Ohje</Text>
                        <View style={defaultStyle.infoLine} />
                    </View>
                
                    { imageUrl? (
                    <Image
                        source={{ uri: imageUrl}}
                        //väliaikanen style, ei näkynyt ilman mitään styleä
                        style={{height: 300, margin: 8}} 
                    />
                    ): (<Text style={{textAlign:'center'}}>Ei kuvaa saatavilla</Text>)}
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 8}}>
                        <Text style={[defaultStyle.recipeTitle, {textAlign: "center"}]}>{selectedItem.recipename}</Text>
                    </View>
                    <View style={defaultStyle.recipeDetails}>
                        <Text style={defaultStyle.detailsTitle}>Ainesosat:</Text>
                        <ScrollView style={defaultStyle.detailsText}>{ingredientList}</ScrollView>
                    </View>
                    <View style={defaultStyle.recipeDetails}>
                        <Text style={defaultStyle.detailsTitle}>Ohjeet:</Text>
                        <Text style={defaultStyle.detailsText}>{selectedItem.instructions}</Text>
                    </View>
                    <View style={defaultStyle.recipeDetails}>
                        <Text style={defaultStyle.detailsTitle}>Kategoriat:</Text>
                        <ScrollView style={defaultStyle.detailsText}>{categoryList}</ScrollView>
                    </View>
                    <Pressable onPress={close}>
                        <Text style={defaultStyle.detailsTitle}>sulje ohje</Text>
                    </Pressable>
                </View>
            </ScrollView>
        )
        } else {
            return(
            <ScrollView style={defaultStyle.navMargin}>
                <ScrollView>
                    {recipeKeys.length > 0 ? (
                    recipeKeys.map(key => (
                        <View>
                            <TouchableOpacity onPress={() => setSelectedItem(allRecipes[key])}>
                                <RecipeItem key={key} id={key} recipeItem={allRecipes[key]} />
                            </TouchableOpacity>  
                        </View>
                    ))
                    ) : (
                    <Text>There are no items</Text>
                    )}
                </ScrollView>
            </ScrollView>
            )
        }
    }





    
}

export default QueryRecipe