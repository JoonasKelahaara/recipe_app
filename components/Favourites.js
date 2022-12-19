import { Text, ScrollView, View, Button, ImageBackground} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React, { useState, useEffect } from "react"
import { collection, getDoc, where, query, documentId, doc } from "firebase/firestore";
import { db, LIKES_REF, auth } from '../firebase/Config'

export default function Favourites() {
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState([])
    const userId = auth.currentUser.uid

    useEffect(() => {
        setLoading(true)
        getLikes()
    }, [])

    const getLikes = async () => {
        const docRef = doc(db, LIKES_REF, userId)
        await getDoc(docRef).then((docSnap) => {
            console.log(docSnap.data())
            let results = [] 
        })
    }

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Suosikit</Text>
            <View style={defaultStyle.infoLine} />
        </View>
    </ScrollView>
    )
}