import { Text, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Terms({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text style={defaultStyle.infoText}>Yleiset käyttöehdot</Text>
        <Text style={defaultStyle.pageTitle}>Tämä sovellus on Oulun Ammattikorkeakoulun ryhmän TIK21KM projekti, kurssille
        "Mobile Project IT00CT43-3003". Käyttämällä tätä sovellusta hyväksyt tietosuojaselosteen ja yleiset käyttöehdot.</Text>

        <TouchableOpacity onPress={() => navigation.navigate(name)}>
                <AntDesign name="back" size={18} color="black" />
        </TouchableOpacity>
    </ScrollView>
    )
}