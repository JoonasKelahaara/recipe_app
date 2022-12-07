import React from 'react';
import { View, Text, Dimensions, Image } from "react-native";
import {defaultStyle} from '../styles/styles.js';
//import {BrowserRouter as Router, Link} from 'react-router-dom';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const data = [
  {  img: require("../img/carousel_maindish.png" ),
     title:"Ruoat",
     //link:"../Foods.js",
      //body: "Ruoat",  
  },
  {   img: require("../img/carousel_drinks.png" ),  
      title:"Juomat",
      //link:"../Foods.js",
      //body: "Juomat",
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
    //<Router>
    <View style={defaultStyle.carouselItemContainer} key={index}>
      <Image
        source={ item.img}
        style={{width: ITEM_WIDTH,
        height: 300}} 
        //style={defaultStyle.carouselImage}
      />
      <Text style={defaultStyle.carouselTitle}>{item.title}</Text>
      {/* <Text >{defaultStyle.body}</Text> */}
    </View>
    //</Router>
  )
}

export default CarouselCardItem;