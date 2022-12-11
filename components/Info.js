import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Info({ name, name2, name3, name4 }) {

    const navigation = useNavigation()

    return (
        <View style={defaultStyle.viewBorder}>
            <ScrollView style={defaultStyle.navMargin}>
                <Text style={defaultStyle.infoHeader}>Info</Text>
                <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name2)}>
                    <Text style={defaultStyle.infoTextt}>Tuki</Text>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name3)}>
                    <Text style={defaultStyle.infoText}>Käyttöehdot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name4)}>
                    <Text style={defaultStyle.infoText}>Tietosuoja</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={defaultStyle.settingsButton} onPress={() => navigation.navigate(name)}>
                        <Text style={defaultStyle.settingsButton}><AntDesign name="setting" size={34} color="#8EC641" />Asetukset</Text>
                    </TouchableOpacity>
            </ScrollView>
        </View>
    )
}