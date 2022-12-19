import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native'

import { db, storage, RECIPES_REF } from '../firebase/Config'
import { ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

import { RecipeItem } from './Recipe/RecipeItem'
import LikeRecipe from './Recipe/LikeRecipe';

import { defaultStyle } from '../styles/styles'

export function Recipes () {

    const [allRecipes, setAllRecipes] = useState([])
    const [imageUrl, setImageURL] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)

    function close () {
        setSelectedItem(null)
        setImageURL(null)
    }

    {/* Hakee kaikki reseptit */}
    useEffect(() => {
        setLoading(true)
        getDocs(collection(db, RECIPES_REF)).then(docSnap => {
            let recipes = [];
            docSnap.forEach((doc) => {
                recipes.push({ ...doc.data(), id:doc.id })
            })
            setAllRecipes(recipes)
            setLoading(false)
        })
    }, [])

    let recipeKeys = Object.keys(allRecipes)

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
            /* recipe details */
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
                        <LikeRecipe />
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
                        <Text style={defaultStyle.detailsTitle}>Sulje ohje</Text>
                    </Pressable>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView style={defaultStyle.navMargin}>
                {/* näyttää kaikki reseptit */}
                <View style={{ flex: 1, alignItems: 'center' }}></View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={defaultStyle.infoLine} />
                    <Text style={defaultStyle.infoHeader}>Reseptit</Text>
                    <View style={defaultStyle.infoLine} />
                </View>
                <ScrollView>
                <ActivityIndicator animating={loading} size='large' color='grey' />
                    {recipeKeys.length > 0 ? (
                    recipeKeys.map(key => (
                        <View>
                            <TouchableOpacity onPress={() => setSelectedItem(allRecipes[key])}>
                                <RecipeItem key={key} id={key} recipeItem={allRecipes[key]} />
                            </TouchableOpacity>  
                        </View>
                    ))
                    ) : (
                        
                    <Text>Reseptejä ladataan</Text>
                    )}
                </ScrollView>
            </ScrollView>
        )
    }

    
}

export default Recipes