import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'

export default function Settings() {
    return(
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Asetukset</Text>
        </ScrollView>
    )
}