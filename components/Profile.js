import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Profile({ screenName }) {

    const navigation = useNavigation()

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Käyttäjäprofiili</Text>
            <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
                <AntDesign name="setting" size={34} color="black" />
            </TouchableOpacity>
        </ScrollView>
    )
}