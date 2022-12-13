import React from 'react';
import { Image, StatusBar, View, ScrollView, Flatlist } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { foods } from './FoodList.js';


export default function FoodPics() {

    let foodSelection = [];
    for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
    } 



    return (
        <ScrollView style={defaultStyle.foodContainer}>
            <View >
                <Flatlist
                data={foods}
                renderItem={({item}) => <Item food={item}></Item>}  
                /> 
            </View>
        </ScrollView>
    )
}


const Item = ({food}) => {
    return (
        <View style={defaultStyle.foodCard}>
            <Text>{food.title}</Text>
            <Image style={defaultStyle.foodImage} source={food.img}></Image>
        </View>
    )
}   