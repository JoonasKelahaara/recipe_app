import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { updateProfile } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from "expo-image-picker"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Photoform() {
    const user = auth.currentUser
    const [profilePic, setProfilePic] = useState(null)

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

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <Text>Profiilikuvan vaihto</Text>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="upload" size={24} color="black"/>
            </TouchableOpacity>
            <View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(!modalVisible)}>
                    <Entypo name={'circle-with-cross'} size={68} color="red" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleUpload}>
                    <AntDesign name="checkcircle" size={64} color="green" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}