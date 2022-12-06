import { View, ScrollView, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth } from '../firebase/Config'
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import placeholder from '../img/profile.png'

export default function Profile({ name }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName
    const [photo, setPhoto] = useState('../img/profile.png')
    const [uploadImage, setUploadImage] = useState({})

    useEffect(() => {
        if (user?.photo) {
        setPhoto(user.photo)
        }
    }, [user])

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }
    
    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    function handleProfilePicture() {

    }

    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        setUploadImage(result)
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Käyttäjäprofiili {username}</Text>
            <View style={defaultStyle.profilePicture}>
                <Image source={photo} />
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
                <AntDesign name="upload" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={logout}>
                <Text style={defaultStyle.buttonText}>Kirjaudu ulos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={resetPassword}>
                <Text style={defaultStyle.buttonText}>Vaihda salasana</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}