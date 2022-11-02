import React from "react";
import { View, Text} from "react-native";

export const RecipeItem = ({recipeItem: {recipeItem: title }, id}) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

