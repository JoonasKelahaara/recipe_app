import { Text, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Support({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text style={defaultStyle.infoText}>Tuki</Text>
        <Text style={defaultStyle.pageTitle}>Jos sovellusta käyttäessä ilmenee ongelmia tai vikoja, ota yhteyttä sähköpostitse osoitteeseen
        n0jako00@students.oamk.fi.</Text>
    </ScrollView>
    )
}