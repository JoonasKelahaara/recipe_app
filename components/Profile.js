import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { auth } from '../firebase/Config'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ name }) {

    const navigation = useNavigation()

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Käyttäjäprofiili {auth.currentUser?.email}</Text>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={logout}>
                <Text style={defaultStyle.buttonText}>Kirjaudu ulos</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}