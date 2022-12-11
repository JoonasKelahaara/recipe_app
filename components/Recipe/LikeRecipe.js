import React from "react"; 
import { View, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function LikeRecipe() {
    return (
        <View>
            <TouchableOpacity>
                <Ionicons name="heart-circle-outline" size={36} color="black" />
            </TouchableOpacity>
        </View>
    )
}