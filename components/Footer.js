import React from 'react';
import { Text, View } from 'react-native'
import {defaultStyle} from '../styles/styles.js'

export default function Footer() {
    return (
    <View style={defaultStyle.footer}>
        <Text>Ryhymä kolomosen tekijjät</Text>
    </View>
    )
}