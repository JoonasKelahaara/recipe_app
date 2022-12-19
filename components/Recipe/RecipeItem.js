import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import { storage } from '../../firebase/Config'
import { ref, getDownloadURL } from "firebase/storage";

import LikeRecipe from './LikeRecipe';

import { defaultStyle } from '../../styles/styles.js'


export const RecipeItem = ({recipeItem: { recipename: recipeName}}) => {

  const [imageUrl, setImageURL] = useState(null)  
  const isFocused = useIsFocused();

  useEffect(() => {
    getDownloadURL(ref(storage, (recipeName+'.jpg')))
    .then((url) => {
      setImageURL(url)
    });
  }, [isFocused])

  return (
    <ScrollView style={defaultStyle.recipeItem}>
      <View>
        {/* kuva */}
        <View>
          { imageUrl? (
          <Image
            source={{ uri: imageUrl}}
            style={{height: 200, resizeMode: "cover", borderTopLeftRadius: 6, borderTopRightRadius: 6}} 
          />
          ): (<Text style={{textAlign:'center'}}>Ei kuvaa saatavilla</Text>)}
        </View>
        {/* nimi */}
        <View>
          <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
          <LikeRecipe />
        </View>
      </View>
    </ScrollView>
  )
}

export default RecipeItem