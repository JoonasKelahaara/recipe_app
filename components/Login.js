import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Kirjaudu sisään</Text>
            <TextInput
                placeholder='Käyttäjä'
                onChangeText={setUsername}
                style={defaultStyle.textInput}
            />
            <TextInput
                placeholder='Salasana'
                onChangeText={setPassword}
                style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} >
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}