import React from 'react';
import { View, Text, Dimensions, Image } from "react-native";
import { Pressable } from 'react-native';
import {defaultStyle} from '../styles/styles.js';
import  FoodPics  from './Foods.js';
//import { useNavigation } from '@react-navigation/native';
//import {BrowserRouter as Router, Link} from 'react-router-dom';

/* export default function Foods({ name, name2 }) {
    
  const navigation = useNavigation();
 */
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const data = [
  {  img: require("../img/carousel_maindish.png" ),
     title:"Ruoat",
     //link:"../Foods.js",
      body: "Ruoka-reseptejä laidasta laitaan.",  
  },
  {   img: require("../img/carousel_drinks.png" ),  
      title:"Juomat",
      //link:"../Foods.js",
      body: "Juoma-reseptejä laidasta laitaan.",
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
   
    <View style={defaultStyle.carouselItemContainer} key={index}>
      {/* <Pressable onPress={() => navigation.navigate(name)}> */}
      <Image
        source={ item.img}
        style={{width: ITEM_WIDTH,
        height: 300}} 
        //style={defaultStyle.carouselImage}
      />
        <Text style={defaultStyle.carouselTitle}>{item.title}</Text>
        <Text style={defaultStyle.carouselBody}>{item.body}</Text> 
      {/* </Pressable> */}
    </View>
    
  )
}

export default CarouselCardItem; 

// }