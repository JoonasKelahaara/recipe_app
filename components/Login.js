import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, { useState, useEffect } from 'react'
import { handleSignIn } from '../firebase/Config.js';

export default function Login() {

    //testi.testi@testi.com testi1234

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogIn = async () => {
        await handleLogIn(email, password)
    }

    const handleSubmit = async () => {
        if (email === "" || password === "") {
          alert('Väärät tiedot');
        } else {
          try {
            await handleSignIn(email, password);
          } catch (error) {
            console.error(error);
          }
        }
      };

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Kirjaudu sisään</Text>
            <TextInput
                placeholder='Sähköposti'
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput}
            />
            <TextInput
                placeholder='Salasana'
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                style={defaultStyle.textInput}
            />
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={handleSubmit} >
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}