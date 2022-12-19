import React, { useState, useEffect } from 'react'
import { defaultStyle } from '../../styles/styles'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { db, RECIPES_REF, auth } from '../../firebase/Config'
import { collection, getDocs, where, query } from "firebase/firestore";
import { useRoute } from '@react-navigation/native';

import { RecipeItemUpdate } from './RecipeItemUpdate'
import { useIsFocused } from '@react-navigation/native';

export function QueryRecipe () {
    const username = auth.currentUser?.displayName
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('Ei reseptejä')
    const [category, setCategory] = useState('categories')
    const [value, setValue] = useState(username)
    const isFocused = useIsFocused();

    const route = useRoute();
    
    {/* Hakee kaikki reseptit */}
    const [allRecipes, setAllRecipes] = useState([])

    const q = query(collection(db, RECIPES_REF), where(route.params.category , route.params.search , route.params.value))

    /* setQuery(route.params.category + route.params.search + route.params.value) */
    /* console.log(query) */

    useEffect(() => {
        setLoading(true)
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
}

export default QueryRecipe