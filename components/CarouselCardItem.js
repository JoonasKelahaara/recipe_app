import React from 'react';
import { View, Text, Dimensions, Image } from "react-native";
//import {defaultStyle} from '../styles/styles.js';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const data = [
  {   img: require("../img/carousel_maindish.png" ),
      title:"Pääruoka",
      //body: "Pääruoka",
      //img: "../img/carousel_maindish.png",
  },
  {   img: require("../img/carousel_desserts.png" ),  
      title:"Juomat",
      //body: "Juomat",
      //img: "../img/carousel_maindish.png",
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
    <View key={index}>
      <Image
        source={ item.img}
        style={{width: ITEM_WIDTH,
          height: 300}}
      />
      <Text >{item.title}</Text>
      {/* <Text >{item.body}</Text> */}
    </View>
  )
}

export default CarouselCardItem;