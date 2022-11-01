import React from 'react';
import { Text, View } from 'react-native'
import {defaultStyle} from '../styles/styles.js'

export default function Header() {
    return (
    <View>
        <Text style={defaultStyle.header}>Syökää ruokaa ja viinaa juokaa</Text>
    </View>
    )
}