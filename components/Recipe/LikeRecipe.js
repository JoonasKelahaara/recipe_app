import React from "react"; 
import { View, TouchableOpacity} from 'react-native'
import { auth, db, LIKES_REF } from '../../firebase/Config'
import { addDoc, arrayRemove, arrayUnion, doc, updateDoc, collection } from "firebase/firestore"
import { Ionicons } from '@expo/vector-icons';

export default function LikeRecipe({ recipename }) {

    const user = auth.currentUser

    function handleLike() {
        updateDoc(arrayUnion(db, LIKES_REF), {
            name: user.uid,
        }).then(() => {
            console.log('liked')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.6} onPress={handleLike}>
                <Ionicons name="heart-circle-outline" size={36} color='black' />
            </TouchableOpacity>
        </View>
    )
}