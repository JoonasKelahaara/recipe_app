import { View, ScrollView, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Photoform from './Photoform'

export default function Profile({ name }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName
    const [profilePic, setProfilePic] = useState(null)
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/recipe-app-c9104.appspot.com/o/profile%2Fprofile.png?alt=media&token=18374552-cb08-4441-96ee-dbdf31d0a3bc')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user) {
            setPhoto(user.photoURL)
        }
    }, [user])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })
        setProfilePic(result.uri)

    }

    const handleUpload = async () => {
        const storageRef = ref(storage, ('profile/' + user.uid + '.jpg'))
        const img = await fetch(profilePic)
        const bytes = await img.blob()

        const snapshot = await uploadBytes(storageRef, bytes)
        const photoURL = await getDownloadURL(storageRef)

        updateProfile(user, {photoURL})

        setProfilePic(null)
    }

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }
    
    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <View style={defaultStyle.profilePicture}>
                <Image source={{uri:photo}} style={defaultStyle.profilePicture} resizeMode='contain'/>
            </View>
            <Text style={defaultStyle.miscText}>{username}</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={pickImage} >
                <AntDesign name="upload" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpload}>
                <Text>Lataa</Text>
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