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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={defaultStyle.infoLine} />
                <Text style={defaultStyle.infoHeader}>Omat reseptit</Text>
                <View style={defaultStyle.infoLine} />
            </View>
            <QueryRecipe />
        </ScrollView>
    )
}