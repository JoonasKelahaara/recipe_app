import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import { defaultStyle } from '../../styles/styles.js'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import QueryRecipe from './QueryRecipe.js';

export default function UserRecipes({ name }) {

    const navigation = useNavigation();

    return(
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={[defaultStyle.infoHeader, {marginBottom: 10}]}>Omat reseptit</Text>
            <QueryRecipe />
        </ScrollView>
    )
}