import { Text, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React from "react"
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Info({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
                <Text style={defaultStyle.infoTextt}>Tuki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
                <Text style={defaultStyle.infoText}>Käyttöehdot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
                <Text style={defaultStyle.infoText}>Tietosuoja</Text>
            </TouchableOpacity>
        <TouchableOpacity style={defaultStyle.settingsButton} onPress={() => navigation.navigate(name)}>
            <Text style={defaultStyle.infoTextt}>Asetukset</Text>
                <AntDesign name="setting" size={34} color="black" />
            </TouchableOpacity>
    </ScrollView>
    )
}