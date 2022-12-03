import React from 'react';
import { StatusBar, View } from 'react-native-web';

export const foods = [
    {
        id:1,
        title: 'Pääruoat',
        body: 'Pääruoka vaihtoehtoja',
        img: '../img/carousel_maindish.png'
    },
    {
        id:2,
        title: 'Jälkiruoat',
        body: 'Jälkiruoka vaihtoehtoja',
        img: '../img/carousel_desserts.png'
    },
    {
        id:3,
        title: 'Kasvisruoat',
        body: 'Kasvisruoka vaihtoehtoja',
        img: '../img/carousel_maindish.png'
    },
    {
        id:4,
        title: 'Kalaruoat',
        body: 'Kalaruoka vaihtoehtoja',
        img: '../img/carousel_fish.png'
    },
    {
        id:5,
        title: 'Kanaruoat',
        body: 'Kanaruoka vaihtoehtoja',
        img: '../img/carousel_maindish.png'
    },
    {
        id:6,
        title: 'Alkuruoat',
        body: 'Alkuruoka vaihtoehtoja',
        img: '../img/food2.png'
    },
    {
        id:7,
        title: 'Leivät',
        body: 'Leipä vaihtoehtoja',
        img: '../img/breads.png'
    },
]

export default function FoodPics() {

    let foodSelection = [];
    for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
    }
}

/* const Item = ({food}) => {
    return (
        <View>
            <Text>{food.body}</Text>
        </View>
    )
} */

return (
    <View style={{marginTop: StatusBar.currentHeight || 0 }}>
        <ScrollView>
            {foodSelection.map((item, i) =>
                <Text style={{fontSize:20}} key={i}>{item.title}</Text>)}
        </ScrollView>    
    </View>
)