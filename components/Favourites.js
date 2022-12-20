import { Text, ScrollView, View, ActivityIndicator} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React, { useState, useEffect } from "react"
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, RECIPES_REF, auth } from '../firebase/Config'
import AddRecipe from './Recipe/AddRecipe.js';
import { RecipeItemUpdate } from './Recipe/RecipeItemUpdate'

export default function Favourites() {
    const username = auth.currentUser?.displayName
    const [loading, setLoading] = useState(false)
    const [allRecipes, setAllRecipes] = useState([])

    const q = query(collection(db, RECIPES_REF), where("username", "==", username ))

    let recipeKeys = Object.keys(allRecipes)

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
    }, [])

    console.log(allRecipes)

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Omat reseptit</Text>
            <View style={defaultStyle.infoLine} />
        </View>
        <AddRecipe />
        <ScrollView>
                    <ActivityIndicator animating={loading} size='large' color='grey' />
                    {recipeKeys.length > 0 ? (
                    recipeKeys.map(key => (
                        <View>
                            <RecipeItemUpdate key={key} id={key} recipeItem={allRecipes[key]} />
                        </View>
                    ))
                    ) : (
                    <Text style={defaultStyle.miscText}>Sinulla ei ole reseptejä</Text>
                    )}
            </ScrollView>
    </ScrollView>
    )
}