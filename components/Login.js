import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import auth from '@react-native-firebase/auth';

export default function Login() {

    //testi.testi@testi.com testi1234

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn() {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Logged in!')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Kirjaudu sisään</Text>
            <TextInput
                placeholder='Sähköposti'
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput}
            />
            <TextInput
                placeholder='Salasana'
                value={password}
                onChangeText={text => setPassword(text)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={handleSignIn()} >
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}