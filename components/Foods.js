import React from 'react';
import { StatusBar, View } from 'react-native-web';

export const foods = [
    {
        id:1,
        title: 'Pääruoat',
        body: 'Pääruoka vaihtoehtoja',
        img: require("../img/carousel_maindish.png")
    },
    {
        id:2,
        title: 'Jälkiruoat',
        body: 'Jälkiruoka vaihtoehtoja',
        img: require("../img/carousel_desserts.png")
    },
    {
        id:3,
        title: 'Kasvisruoat',
        body: 'Kasvisruoka vaihtoehtoja',
        img: require("../img/carousel_maindish.png")
    },
    {
        id:4,
        title: 'Kalaruoat',
        body: 'Kalaruoka vaihtoehtoja',
        img: require("../img/carousel_fish.png")
    },
    {
        id:5,
        title: 'Kanaruoat',
        body: 'Kanaruoka vaihtoehtoja',
        img: require("../img/carousel_maindish.png")
    },
    {
        id:6,
        title: 'Alkuruoat',
        body: 'Alkuruoka vaihtoehtoja',
        img: require("../img/food2.png")
    },
    {
        id:7,
        title: 'Leivät',
        body: 'Leipä vaihtoehtoja',
        img: require("../img/breads.png")
    },
]

export default function FoodPics() {

    let foodSelection = [];
    for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
    }
}


return (
    <ScrollView>
        <View >
            <Flatlist 
               data={foodSelection}
               renderItem={({item}) => <Item food={item}></Item>}
            /* {foodSelection.map((item, i) =>
                <Text style={{fontSize:20}} key={i}>{item.title}</Text>)} */
            />
        </View>
    </ScrollView>
)

const Item = ({food}) => {
    return (
        <View>
            <Text>{food.body}</Text>
            <Image>source={{uri: food.img}}</Image>
        </View>
    )
}