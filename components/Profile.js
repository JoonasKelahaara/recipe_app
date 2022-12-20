import { View, ScrollView, Text, TouchableOpacity, Image, Modal, ActivityIndicator, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import { defaultStyle } from '../styles/styles.js'
import React, {useState, useEffect} from 'react'
import { auth, storage} from '../firebase/Config'
import { sendPasswordResetEmail, signOut, updateProfile} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from "expo-image-picker"
import Header from './Header'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile({ name, name2 }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const email = auth.currentUser?.email
    const username = auth.currentUser?.displayName
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/recipe-app-c9104.appspot.com/o/profile%2Fprofile.png?alt=media&token=18374552-cb08-4441-96ee-dbdf31d0a3bc')
    const [profilePic, setProfilePic] = useState(auth.currentUser.photoURL)
    const [disabled, setDisabled] = useState(true)
    const [disabled2, setDisabled2] = useState(true)
    const [loading, setLoading] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [profileMessage, setProfileMessage] = useState('')

    useEffect(() => {
        if(user?.photoURL) {
            setPhoto(user.photoURL)
        }
    }, [user.photoURL])

    function onLoading(value, label) {
        setLoading(value)
    }

    const showMessage = () => {
        setTimeout(() => {
            setProfileMessage('')
        }, 5000)
    }

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
        setLoading(true)
        const storageRef = ref(storage, ('profile/' + user.uid + '.jpg'))
        const img = await fetch(profilePic)
        const bytes = await img.blob()

        const snapshot = await uploadBytes(storageRef, bytes)
        const photoURL = await getDownloadURL(storageRef)

        updateProfile(user, {photoURL})
        .then(() => {
            setProfilePic(auth.currentUser.photoURL)
            setModalVisible(!modalVisible)
            setDisabled(true)
            handleModal()
        }).catch((err) => {
            console.log(err)
        })
    }

    //Uloskirjautuminen

    const logout = async () => {
        await signOut(auth)
        navigation.navigate(name)
    }

    //Salasanan vaihto sähköpostilla
    
    const resetPassword = async () => {
        if(confirm){
        setMessageLoading(true)
        await sendPasswordResetEmail(auth, email)
        setProfileMessage('Sähköpostipyyntö lähetetty, tämä voi viedä muutaman minuutin.')
        setModalMessage('')
        setModalVisible2(false)
        setConfirm(false)
        showMessage()
        } else {
            setModalMessage('Valitse ruutu ennen pyynnön lähettämistä!')
            return
        }
        setMessageLoading(false)
    }

    //Modalin sulku

    function handleModal() {
        setModalVisible(!modalVisible)
        setProfilePic(auth.currentUser.photoURL)
        setDisabled(true)
        setLoading(false)
    }

    function handleModal2() {
        setModalVisible2(!modalVisible2)
        setConfirm(false)
        setDisabled2(true)
        setModalMessage('')
        setMessageLoading(false)
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <View style={defaultStyle.profilePicture}>
            {loading && <View style={defaultStyle.loading} >
                    <ActivityIndicator color='grey' size='large'/>
                    </View>}
                <TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(true)}>
                    {<Image source={{uri:photo}} 
                            style={defaultStyle.profilePicture} 
                            resizeMode='contain'
                            onLoadStart={() => onLoading(true, 'onLoadStart')}
                            onLoadEnd={() => onLoading(false, 'onLoadEnd')}
                            />}
                </TouchableOpacity>
            </View>
            <Text style={defaultStyle.userName}>{username}</Text>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={() => setModalVisible2(true)}>
                <Text style={defaultStyle.buttonText}>Vaihda salasana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={() => setModalVisible3(true)}>
                <Text style={defaultStyle.buttonText}>Kirjaudu ulos</Text>
            </TouchableOpacity>
            <Text style={defaultStyle.successMessage}>{profileMessage}</Text>
            {/* Modali profiilikuvan vaihdolle */}
            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View>
                    <Header />
                    <Text style={defaultStyle.otherTitle} >Profiilikuvan vaihto</Text>
                    <Text style={defaultStyle.miscText}>Valitse kuva</Text>
                    <View style={{alignSelf:'center'}}>
                        <TouchableOpacity
                            style={[defaultStyle.recipeButtonI, {borderWidth: 3, borderColor: '#92C591', backgroundColor: '#E8F3E8', marginBottom: 45}]}
                            activeOpacity={0.6}
                            onPress={pickImage} >
                                <Image 
                                    style={{ width: 200, height: 200 }}
                                    defaultSource={{uri:photo}}
                                    source={{uri:profilePic}} />
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
                <ActivityIndicator animating={loading} size='large' color='grey' />
                </View>
            </Modal>
            {/* Modal salasanan vaihdon varmistamiseksi */}
            <Modal animationType='slide' transparent={true} visible={modalVisible2} onRequestClose={() => {setModalVisible2(!modalVisible2)}}>
                <View style={{backgroundColor:'white'}}>
                    <Header />
                    <Text style={defaultStyle.otherTitle} >Salasanan vaihto</Text>
                    <Text style={[defaultStyle.miscText, {marginBottom: 25}]}>Haluatko varmasti lähettää salasanan uusimispyynnön?</Text>
                    <Checkbox style={{alignSelf:'center'}} value={confirm} onValueChange={setConfirm} />
                    <View style={[defaultStyle.recipeContainerI, { flexDirection: "row", marginBottom: 12}]}>
                        <TouchableOpacity style={[{flex: 1, justifyContent:"center", alignContent:"center", alignItems: "center"}]} onPress={handleModal2}>
                            <Entypo name={'circle-with-cross'} size={68} color="red" />
                        </TouchableOpacity>
                        <ActivityIndicator animating={messageLoading} size='large' color='grey' />
                        <TouchableOpacity style={[{flex: 1, alignItems: "center"}]} activeOpacity={0.6} onPress={resetPassword}>
                            <AntDesign name="checkcircle" size={64} color="green" />
                        </TouchableOpacity>
                    </View>
                    <Text style={defaultStyle.errorMessage}>{modalMessage}</Text>
                    <View style={{backgroundColor:'#92C591', height:3, marginTop: 15}}></View>
                </View>
            </Modal>
            <Modal animationType='slide' transparent={true} visible={modalVisible3} onRequestClose={() => {setModalVisible3(!modalVisible3)}}>
                <View style={{backgroundColor: 'white'}}>
                    <Header />
                    <Text style={defaultStyle.otherTitle}>Haluatko varmasti kirjautua ulos?</Text>
                    <View style={[defaultStyle.recipeContainerI, { flexDirection: "row", marginBottom: 12}]}>
                        <TouchableOpacity style={[{flex: 1, justifyContent:"center", alignContent:"center", alignItems: "center"}]} onPress={() => setModalVisible3(false)}>
                            <Entypo name={'circle-with-cross'} size={68} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{flex: 1, alignItems: "center"}]} activeOpacity={0.6} onPress={logout}>
                            <AntDesign name="checkcircle" size={64} color="green" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}