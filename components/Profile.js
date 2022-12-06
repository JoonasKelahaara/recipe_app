import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { auth } from '../firebase/Config'
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ name }) {

    const navigation = useNavigation()
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }
    
    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Käyttäjäprofiili {username}</Text>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={logout}>
                <Text style={defaultStyle.buttonText}>Kirjaudu ulos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={resetPassword}>
                <Text style={defaultStyle.buttonText}>Vaihda salasana</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}