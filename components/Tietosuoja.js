import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Tietosuoja() {
    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text style={defaultStyle.pageTitle}>Tietosuoja</Text>
    </ScrollView>
    )
}