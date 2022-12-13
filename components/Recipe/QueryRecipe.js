import React, { useState, useEffect } from 'react'
import { defaultStyle } from '../../styles/styles'
import { Text, View, ScrollView } from 'react-native'
import { db, RECIPES_REF, auth } from '../../firebase/Config'
import { collection, getDocs, where, query } from "firebase/firestore";

import { RecipeItem } from './RecipeItem'

export function QueryRecipe () {
    const username = auth.currentUser?.displayName

    {/* Hakee kaikki reseptit */}
    const [allRecipes, setAllRecipes] = useState([])
    
    useEffect(() => {
        getDocs(query(collection(db, RECIPES_REF), where("username", "==", username))).then(docSnap => {
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

export default QueryRecipe