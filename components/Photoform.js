import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export function Photoform() {
    const user = auth.currentUser
    const [profilePic, setProfilePic] = useState(null)
    const [modalVisible, setModalVisible] = (false)

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

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <ScrollView>
                        <Text>Testi</Text>
                    </ScrollView>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="upload" size={24} color="black"/>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Photoform