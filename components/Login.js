import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config'

export default function Login({ name, name2 }) {

    //testi.testi@testi.com testi1234
    //testi2@testi.com testi666

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate(name2)
        } catch (err) {
            console.log(err)
            alert('Väärät käyttäjätiedot')
        }
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
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={login}>
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
            <Text>Etkö ole vielä rekisteröitynyt?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(name)}>
                <Text>Rekisteröidy tästä</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}