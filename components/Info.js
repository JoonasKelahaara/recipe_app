import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Info() {
    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text>Info</Text>
    </ScrollView>
    )
}