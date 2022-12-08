import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from "expo-image-picker"
import ImageLoad from 'react-native-image-placeholder';
import Header from './Header'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile({ name }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName
    const [profilePic, setProfilePic] = useState(null)
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/recipe-app-c9104.appspot.com/o/profile%2Fprofile.png?alt=media&token=18374552-cb08-4441-96ee-dbdf31d0a3bc')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(user?.photoURL) {
            setPhoto(user.photoURL)
        }
    }, [user])

    //Kuvan valinta

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [4, 4],
            selectionLimit: 1
        })

        if (result.cancelled) { return }

        setProfilePic(result.uri)
        setDisabled(false)
    }

    //Kuvan lataaminen firebaseen käyttäjälle

    const handleUpload = async () => {
        const storageRef = ref(storage, ('profile/' + user.uid + '.jpg'))
        const img = await fetch(profilePic)
        const bytes = await img.blob()

        const snapshot = await uploadBytes(storageRef, bytes)
        const photoURL = await getDownloadURL(storageRef)

        updateProfile(user, {photoURL})

        setProfilePic(null)
        setModalVisible(!modalVisible)
        setDisabled(true)
    }

    //Uloskirjautuminen

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }

    //Salasanan vaihto sähköpostilla
    
    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    function handleModal() {
        setModalVisible(!modalVisible)
        setProfilePic(null)
        setDisabled(true)
    }

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <View style={defaultStyle.profilePicture}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(true)}>
                    <Image source={{uri:photo}} style={defaultStyle.profilePicture} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <Text style={defaultStyle.userName}>{username}</Text>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={logout}>
                <Text style={defaultStyle.buttonText}>Kirjaudu ulos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={resetPassword}>
                <Text style={defaultStyle.buttonText}>Vaihda salasana</Text>
            </TouchableOpacity>
            {/* Modali profiilikuvan vaihdolle */}
            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <Header />
                    <Text style={defaultStyle.profilePicTitle} >Profiilikuvan vaihto</Text>
                    <Text style={defaultStyle.miscText}>Valitse kuva</Text>
                    <View style={{alignSelf:'center'}}>
                        <TouchableOpacity
                            style={[defaultStyle.recipeButtonI, {borderWidth: 3, borderColor: '#92C591', backgroundColor: '#E8F3E8', marginBottom: 45}]}
                            activeOpacity={0.6}
                            onPress={pickImage} >
                                <ImageLoad
                                    style={{ width: 200, height: 200 }}
                                    loadingStyle={{size:'small', color:'grey'}}
                                    isShowActivity={true}
                                    placeholderSource={{uri:'https://firebasestorage.googleapis.com/v0/b/recipe-app-c9104.appspot.com/o/profile%2Fprofile.png?alt=media&token=18374552-cb08-4441-96ee-dbdf31d0a3bc'}}
                                    source={{uri:photo}}
                                />
                        </TouchableOpacity>
                    </View>
                <View style={[defaultStyle.recipeContainerI, { flexDirection: "row", marginBottom: 12}]}>
                    <TouchableOpacity style={[{flex: 1, justifyContent:"center", alignContent:"center", alignItems: "center"}]} 
                                    activeOpacity={0.6} onPress={handleModal}>
                        <Entypo name={'circle-with-cross'} size={68} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disabled} style={[{flex: 1, alignItems: "center"}]} activeOpacity={0.6} onPress={handleUpload}>
                        <AntDesign name="checkcircle" size={64} color={disabled? "grey" : "green"} />
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </ScrollView>
    )
}