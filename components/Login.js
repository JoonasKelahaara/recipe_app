import { View, ScrollView, TextInput, Text, TouchableOpacity, Pressable } from 'react-native';
import { defaultStyle } from '../styles/styles.js'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config'

export default function Login({ name, name2 }) {

    //testi.testi@testi.com testi1234
    //testi2@testi.com testi666

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [securePassword, setSecurePassword] = useState(true)

    const navigation = useNavigation()
    
    const login = async () => {
        if(!email || !password) {
            setMessage('Puuttuvia tietoja!')
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate(name2)
        } catch (err) {
            console.log(err)
            setMessage('Väärät käyttäjätiedot!')
        }
    }

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <Text style={defaultStyle.pageTitle}>Kirjaudu sisään</Text>
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
            <TouchableOpacity style={defaultStyle.button} activeOpacity={0.6} onPress={login}>
                <Text style={defaultStyle.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
            <Text style={defaultStyle.errorMessage} >{message}</Text>
            <Text style={defaultStyle.miscText}>Etkö ole vielä rekisteröitynyt?</Text>
            <TouchableOpacity style={defaultStyle.link} activeOpacity={0.6} onPress={() => navigation.navigate(name)} >
                <Text style={defaultStyle.linkText}>Rekisteröidy tästä</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}