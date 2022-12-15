import React, { useState } from "react"; 
import { View, TouchableOpacity} from 'react-native'
import { auth, db, LIKES_REF } from '../../firebase/Config'
import { arrayRemove, arrayUnion, doc, updateDoc, collection, query, where } from "firebase/firestore"
import { Ionicons } from '@expo/vector-icons';

export default function LikeRecipe({ recipename }) {
    const [color, setColor] = useState('black')
    const user = auth.currentUser
    const userId = auth.currentUser.uid
    const docRef = (db, LIKES_REF, userId)

/*     const handleLike = async () => {
        let arrayQuery = query(docRef, where("likes", "==", recipename))

        if(recipename != arrayQuery){
        await updateDoc(docRef), {
            likes: arrayUnion(recipename)
        }
        setColor('red')
        } else {
            await updateDoc(docRef, {
                likes: arrayRemove(recipename)
            })
        setColor('black')
        }
    } */

    return (
        <View>
            <TouchableOpacity activeOpacity={0.6} /* onPress={handleLike} */>
                <Ionicons name="heart-circle-outline" size={36} color={color} />
            </TouchableOpacity>
        </View>
    )
}