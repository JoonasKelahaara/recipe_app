import React, { useState, useEffect } from 'react'
import { defaultStyle } from '../styles/styles'
import { Text, View, ScrollView } from 'react-native'
import { db, RECIPES_REF } from '../firebase/Config'
import { collection, getDocs, where, query } from "firebase/firestore";

import { RecipeItem } from './Recipe/RecipeItem'
import { AddRecipe } from './Recipe/AddRecipe'
export function Recipes () {

    {/* Hakee kaikki reseptit */}
    const [allRecipes, setAllRecipes] = useState([])
    
    useEffect(() => {
        getDocs(collection(db, RECIPES_REF)).then(docSnap => {
            let recipes = [];
            docSnap.forEach((doc) => {
                recipes.push({ ...doc.data(), id:doc.id })
            })
            setAllRecipes(recipes)
        })
    }, [])

    let recipeKeys = Object.keys(allRecipes)

    return (
        <ScrollView style={defaultStyle.navMargin}>
                {/* Reseptin lisäys */}
            {/* <AddRecipe></AddRecipe> */}

            {/* näyttää kaikki reseptit */}
            <View style={{ flex: 1, alignItems: 'center' }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Reseptit</Text>
            <View style={defaultStyle.infoLine} />
            </View>
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