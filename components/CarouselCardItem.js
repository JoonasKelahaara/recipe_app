import React from 'react';
import { View, Text, Dimensions, Image } from "react-native";
import {defaultStyle} from '../styles/styles.js';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const data = [
  {   title:"Pääruoka",
      //body: "Pääruoka",
      imgUrl: "../img/carousel_maindish.png",
  },
  {   title:"Juomat",
      //body: "Juomat",
      imgUrl: "../img/carousel_maindish.png",
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
    <View key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={{width: ITEM_WIDTH,
          height: 300}}
      />
      <Text >{item.title}</Text>
      {/* <Text >{item.body}</Text> */}
    </View>
  )
}

export default CarouselCardItem;