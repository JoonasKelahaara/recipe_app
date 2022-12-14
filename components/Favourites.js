import { Text, ScrollView, View} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"

export default function Favourites() {
    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={{ flex: 1, alignItems: 'center' }}></View>
        <View style={defaultStyle.viewBorder}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 3, backgroundColor: '#8EC641'}} />
            <Text style={defaultStyle.infoHeader}>Suosikit</Text>
        </View>
        </View>
    </ScrollView>
    )
}