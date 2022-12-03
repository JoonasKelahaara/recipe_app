import React from 'react';
import { View } from 'react-native-web';

export const foods = [
    {
        id:1,
        title: 'Pääruoat',
        img: '../img/carousel_maindish.png'
    },
    {
        id:2,
        title: 'Jälkiruoat',
        img: '../img/carousel_desserts.png'
    },
    {
        id:3,
        title: 'Kasvisruoat',
        img: '../img/carousel_maindish.png'
    },
    {
        id:4,
        title: 'Kalaruoat',
        img: '../img/carousel_fish.png'
    },
    {
        id:5,
        title: 'Kanaruoat',
        img: '../img/carousel_maindish.png'
    },
    {
        id:6,
        title: 'Alkuruoat',
        img: '../img/food2.png'
    },
    {
        id:7,
        title: 'Leivät',
        img: '../img/breads.png'
    },
]

export default function FoodPics() {

    let foodSelection = [];
    for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
    }
}

return (
    <View>
        {testData.map((item, i) =>
            <Text style={{fontSize:20}} key={i}>{item.title}</Text>)}
    </View>
)