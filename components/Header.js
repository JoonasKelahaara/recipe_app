import React from 'react';
import { Text, View, Image } from 'react-native'
import {defaultStyle} from '../styles/styles.js'

export default function Header() {

    return (
            <View style={[defaultStyle.header, defaultStyle.shadowIoS, defaultStyle.shadowAndroid]}>
                <View style={defaultStyle.logoBorder}>
                    <Image source={require('../img/logo_transparent.png')} style={defaultStyle.logo} resizeMode= 'contain' />
                </View>
            </View>
    )
}