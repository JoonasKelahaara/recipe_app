import { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Settings({ name }) {

    const [isEnabled, setIsEnabled] = useState(false)

    const navigation = useNavigation()
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    return(
        <ScrollView style={defaultStyle.settings}>
            <View style={defaultStyle.flexRow}>
                <TouchableOpacity onPress={() => navigation.navigate(name)}>
                    <AntDesign name="back" size={18} color="black" />
                </TouchableOpacity>
                <Text style={defaultStyle.pageTitle}>Asetukset</Text>
            </View>
            <View style={defaultStyle.flexRow}>
                <Text>Testi</Text>
                <Switch value={isEnabled} 
                        onValueChange={toggleSwitch} 
                        trackColor={{ false: "#767577", true: '#92C591' }}
                        thumbColor="#8EC641" />
            </View>
            <View style={defaultStyle.flexRow}>
                <Text>Testi 2</Text>
                <TouchableOpacity style={defaultStyle.button}>
                    <Text style={defaultStyle.buttonText}>Nappi</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}