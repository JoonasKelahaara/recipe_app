import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config'

export default function Signin({ name, name2 }) {

    const [email, setEmail] = useState('')
    const [verifyEmail, setVerifyEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigation = useNavigation()

    const register = async () => {

        if(!email || !password || !verifyEmail || !verifyPassword) {
            setMessage('Täytä kaikki kentät!')
            return
        }

        if(email != verifyEmail || password != verifyPassword) {
            setMessage('Tarkasta tiedot!')
            return
        }

        try{
        const user = await createUserWithEmailAndPassword(auth, email, password)
        navigation.navigate(name2)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView >
            <Text style={defaultStyle.pageTitle}>Luo käyttäjä</Text>
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
                placeholder='Varmista sähköposti'
                value={verifyEmail}
                onChangeText={text => setVerifyEmail(text)}
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
            <TextInput
                placeholder='Varmista salasana'
                value={verifyPassword}
                onChangeText={text => setVerifyPassword(text)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={register} >
                <Text style={defaultStyle.buttonText}>Luo käyttäjä</Text>
            </TouchableOpacity>
            <Text style={defaultStyle.errorMessage}>{message}</Text>
            <Text style={defaultStyle.miscText}>Onko sinulla jo käyttäjä?</Text>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
                <Text style={defaultStyle.linkText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}