import { View, ScrollView, TextInput, Text, TouchableOpacity, Pressable, Modal, ActivityIndicator } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Config'
import GoogleButton from 'react-google-button'
import Header from './Header'

export default function Login({ name, name2 }) {

    //testi.testi@testi.com testi1234
    //testi2@testi.com testi666

    const [email, setEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('')
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [securePassword, setSecurePassword] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const [modalVisible, setModalVisible] = useState(false)

    const navigation = useNavigation()

    //Sisään kirjautuminen
    
    const login = async () => {
        if(!email || !password) {
            setMessage('Puuttuvia tietoja!')
            return
        }

        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate(name2)
        } catch (err) {
            console.log(err)
            setMessage('Väärät käyttäjätiedot!')
        }
        setLoading(false)
    }

    //Salasanan uusiminen

    const resetPassword = async () => {

        if(!email || !verifyEmail) {
            setMessage('Puuttuvia tietoja!')
            return
        }
    
        try{
            await sendPasswordResetEmail(auth, email)
        } catch(err) {
            console.log(err)
        }

        setModalVisible(false)
        setEmail('')
        setVerifyEmail('') 
    }

    return (
        <ScrollView style={defaultStyle.signInPage} keyboardShouldPersistTaps={'handled'}>
            <Text style={defaultStyle.otherTitle}>Kirjaudu sisään</Text>
            <TextInput
                placeholder='Sähköposti'
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput}
            />
            <View style={defaultStyle.textInput}>
                <TextInput
                    placeholder='Salasana'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={securePassword}
                    style={defaultStyle.inputField}
                />
                <Pressable style={defaultStyle.eyeIcon} onPress={() => securePassword ? setSecurePassword(false) : setSecurePassword(true)}>
                    <AntDesign name={securePassword ? 'eye' : 'eyeo'} size={26}/>
                </Pressable>
            </View>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => setModalVisible(true)}>
                <Text style={defaultStyle.linkText}>Salasana unohtunut?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={login}>
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
            <Text style={defaultStyle.errorMessage} >{message}</Text>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)} >
                <Text style={defaultStyle.linkText}>Ei tiliä? Rekisteröidy tästä</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={defaultStyle.button}>
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään Google-tilillä</Text>
            </TouchableOpacity> */}
            <ActivityIndicator animating={loading} size='large' color='grey' />
            {/* Modal salasanan unohtumiselle */}
            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}} >
                <Header />
                <TextInput 
                placeholder='Sähköposti' 
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={[defaultStyle.textInput, {marginTop: 30}]} />
                <TextInput 
                placeholder='Sähköposti uudestaan' 
                value={verifyEmail}
                onChangeText={text => setVerifyEmail(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput} />
                <Text style={defaultStyle.errorMessage} >{message}</Text>
                <TouchableOpacity style={defaultStyle.button} onPress={resetPassword}>
                    <Text style={defaultStyle.buttonText}>Lähetä pyyntö</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}