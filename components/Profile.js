import { View, ScrollView, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import placeholder from '../img/profile.png'
import ImageLoad from 'react-native-image-placeholder';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile({ name }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName
    const [photo, setPhoto] = useState(placeholder)
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.photoURL) {
        setPhoto(user.photoURL)
        } else {
        setPhoto(placeholder)
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

    console.log(photo)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <View style={defaultStyle.profilePicture}>
                <Image source={{uri:photo}} style={defaultStyle.profilePicture} resizeMode='contain'/>
            </View>
            <Text style={defaultStyle.miscText}>{auth.currentUser.displayName}</Text>
            <TouchableOpacity activeOpacity={0.6} >
                <AntDesign name="upload" size={24} color="black" onPress={pickImage} />
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