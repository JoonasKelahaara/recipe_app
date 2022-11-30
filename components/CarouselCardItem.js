import React from 'react'
import { View, Text, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const data = [
  {   title:"Item 1",
      body: "Pääruoka",
      img: '../img/carousel_maindish.png',
  },
  {   title:"Item 2",
      body: "Juomat",
      img: '../img/carousel_maindish.png',
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
    <View key={index}>
      <Image
        source={{ uri: item.img }}
        //style={styles.image}
      />
      <Text >{item.title}</Text>
      <Text >{item.body}</Text>
    </View>
  )
}

export default CarouselCardItem;