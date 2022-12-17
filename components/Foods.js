import React from 'react';
import { Image, StatusBar, View, ScrollView, Flatlist } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { foods } from './FoodList.js';
import { useNavigation } from '@react-navigation/native';

export default function Foods() {

    const navigation = useNavigation()

    /* let foodSelection = [];
    for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
    }  */

    return (
        <ScrollView >
            <View >
                <Flatlist
                    data={foods}
                    renderItem={({item}) => <Item food={item}></Item>}  
                /> 
            </View>
        </ScrollView>
    );
}


const Item = ({food}) => {
    return (
        <View >
            <Text>{food.title}</Text>
            <Image source={food.img}></Image>
        </View>
    )
}   