import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Home() {
    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text>Home</Text>
    </ScrollView>
    )
}