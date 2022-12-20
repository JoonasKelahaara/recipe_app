import { Text, ScrollView, View, Button, ImageBackground} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import React, { useState, useEffect } from "react"
import { collection, getDoc, where, query, documentId, doc } from "firebase/firestore";
import { db, LIKES_REF, auth } from '../firebase/Config'
import QueryRecipe from './Recipe/QueryRecipe.js';
import AddRecipe from './Recipe/AddRecipe.js';

export default function Favourites() {

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Omat reseptit</Text>
            <View style={defaultStyle.infoLine} />
        </View>
        <AddRecipe />
    </ScrollView>
    )
}