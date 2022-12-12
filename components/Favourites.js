import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Favourites() {
    return(
    <ScrollView style={defaultStyle.viewBorder}>
        <Text style={defaultStyle.infoHeader}>Suosikit</Text>
    </ScrollView>
    )
}