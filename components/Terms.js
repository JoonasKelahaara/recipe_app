import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Terms({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={defaultStyle.viewBorder}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader2}>Yleiset{"\n"}käyttöehdot</Text>
            <View style={defaultStyle.infoLine} />
        </View>
        <Text style={defaultStyle.pageTitle}>Tämä sovellus on Oulun Ammattikorkeakoulun ryhmän TIK21KM projekti, kurssille
        "Mobile Project IT00CT43-3003". Käyttämällä tätä sovellusta hyväksyt tietosuojaselosteen ja yleiset käyttöehdot.</Text>
        </View>
    </ScrollView>
    )
}