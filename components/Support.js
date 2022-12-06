import { Text, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Support({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text style={defaultStyle.pageTitle}>Tuki</Text>
        <TouchableOpacity onPress={() => navigation.navigate(name)}>
                <AntDesign name="back" size={18} color="black" />
        </TouchableOpacity>
    </ScrollView>
    )
}