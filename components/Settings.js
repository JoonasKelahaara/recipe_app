import { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Settings({ name }) {

    const [isEnabled, setIsEnabled] = useState(false)

    const navigation = useNavigation()
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    return(
        
        <ScrollView style={defaultStyle.navMargin}>
            <View style={defaultStyle.viewBorder}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={defaultStyle.infoLine} />
                <Text style={defaultStyle.infoHeader}>Asetukset</Text>
                <View style={defaultStyle.infoLine} />
            </View >
            <Text>{"\n"}</Text>
                <TouchableOpacity style={defaultStyle.settingsButton2} >
                    <AntDesign name='user' color='black' size={26}/>
                    <Text style={defaultStyle.settingsButtonText}>Oma tili</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.settingsButton2} >
                    <Feather name="bell" size={26} color="black" />
                    <Text style={defaultStyle.settingsButtonText}>Ilmoitukset</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.settingsButton2} >
                    <MaterialCommunityIcons name="eye-outline" size={26} color="black" />
                    <Text style={defaultStyle.settingsButtonText}>Ulkoasu</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.settingsButton2} >
                    <MaterialCommunityIcons name="lock-outline" size={26} color="black" />
                    <Text style={defaultStyle.settingsButtonText}>Turvallisuus</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyle.settingsButton2} >
                    <Ionicons name="alert-circle-outline" size={26} color="black" />
                    <Text style={defaultStyle.settingsButtonText}>Ilmoita häiriö</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </ScrollView>
       
    )
}