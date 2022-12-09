import { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function Settings({ name }) {

    const [isEnabled, setIsEnabled] = useState(false)

    const navigation = useNavigation()
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    return(
        <ScrollView style={defaultStyle.settings}>
            <Text style={defaultStyle.pageTitle}>Asetukset</Text>
        </ScrollView>
    )
}