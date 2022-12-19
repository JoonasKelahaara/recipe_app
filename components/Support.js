import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Support({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={defaultStyle.viewBorder}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Tuki</Text>
        <View style={defaultStyle.infoLine} />
        </View>
        <Text style={defaultStyle.pageTitle}>Jos sovellusta käyttäessä ilmenee ongelmia tai vikoja, ota yhteyttä sähköpostitse osoitteeseen:
        n0jako00@students.oamk.fi.</Text>
        </View>
    </ScrollView>
    )
}