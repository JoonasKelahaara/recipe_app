import { ref, remove, child, update } from "firebase/database";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo"
import { View, Text, Pressable} from "react-native";
import { db, RECIPES_REF } from "../firebase/Config";
import {defaultStyle} from '../styles/styles.js'

export const RecipeItem = ({recipeItem: {recipeItem: title, instructions: instructions, categories: allCategories, ingredients: allIngredients }, id}) => {

    const onRemove = () => {
        return remove(child(
            ref(db), RECIPES_REF + id));
    };

    return (
        <View style={defaultStyle.recipeItem}>
            <Text style={defaultStyle.recipeTitle} >{title}</Text>
            <Text>{instructions}</Text>
            <Text>{allCategories}</Text>
            <Text>{allIngredients}</Text>

            <Pressable>
                <Entypo name={"trash"} size={32} onPress={(onRemove)} />
            </Pressable>
        </View>
    );
}

