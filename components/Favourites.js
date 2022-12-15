import { Text, ScrollView, View} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Favourites() {
    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={{ flex: 1, alignItems: 'center' }}></View>
        <View style={defaultStyle.viewBorder}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Suosikit</Text>
            <View style={defaultStyle.infoLine} />
            </View>
        </View>
    </ScrollView>
    )
}