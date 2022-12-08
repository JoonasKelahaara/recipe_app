import { View, ScrollView, TextInput, Text, TouchableOpacity, Pressable } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/Config'

export default function Signin({ name, name2 }) {

    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [message, setMessage] = useState('')
    const [securePassword, setSecurePassword] = useState(true)
    const [secureVerifyPassword, setSecureVerifyPassword] = useState(true)

    const navigation = useNavigation()

    const register = async () => {

        if(!email || !password || !username || !verifyPassword) {
            setMessage('Täytä kaikki kentät!')
            return
        }

        if(password != verifyPassword) {
            setMessage('Tarkasta tiedot!')
            return
        }

        if(password.length < 8) {
            setMessage('Salasanan on oltava vähintään 8 merkkiä pitkä')
            return
        }

        try{
        const user = await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/recipe-app-c9104.appspot.com/o/profile%2Fprofile.png?alt=media&token=18374552-cb08-4441-96ee-dbdf31d0a3bc'
        })
        setMessage('')
        navigation.navigate(name2)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView style={defaultStyle.signInPage}>
            <Text style={defaultStyle.otherTitle}>Luo käyttäjä</Text>
            <TextInput
                placeholder='Sähköposti'
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput}
            />
            <TextInput
                placeholder='Käyttäjänimi'
                value={username}
                onChangeText={text => setUserName(text)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                style={defaultStyle.textInput}
            />
            <View style={defaultStyle.textInput}>
                <TextInput
                    placeholder='Salasana (vähintään 8 merkkiä)'
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
            <View style={defaultStyle.textInput}>
                <TextInput
                    placeholder='Varmista salasana'
                    value={verifyPassword}
                    onChangeText={text => setVerifyPassword(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={secureVerifyPassword}
                    style={defaultStyle.inputField}
                />
                <Pressable style={defaultStyle.eyeIcon} onPress={() => secureVerifyPassword ? setSecureVerifyPassword(false) : setSecureVerifyPassword(true)}>
                    <AntDesign name={secureVerifyPassword ? 'eye' : 'eyeo'} size={26}/>
                </Pressable>
            </View>
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={register} >
                <Text style={defaultStyle.buttonText}>Luo käyttäjä</Text>
            </TouchableOpacity>
            <Text style={defaultStyle.errorMessage}>{message}</Text>
            <Text style={defaultStyle.miscText}>Onko sinulla jo käyttäjä?</Text>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
                <Text style={defaultStyle.linkText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}