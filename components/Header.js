import React from 'react';
import { Text, View, Image } from 'react-native'
import {defaultStyle} from '../styles/styles.js'

export default function Header() {
    return (
    <View>
        <Image source={require('../img/logo.png')} style={defaultStyle.logo} />
    </View>
    )
}