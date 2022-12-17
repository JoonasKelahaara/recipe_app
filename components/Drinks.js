import React from 'react';
import { Image, StatusBar, View, ScrollView, Flatlist } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { drinks } from './DrinkList.js';
import { useNavigation } from '@react-navigation/native';


export default function Drinks() {

    const navigation = useNavigation()

    /* let drinkSelection = [];
    for (let i = 0; i < 20; i++) {
        drinkSelection = [...drinks, ...drinkSelection];
    }  */

    return (
        <ScrollView >
            <View >
                <Flatlist
                data={drinks}
                renderItem={({item}) => <Item drink={item}></Item>}  
                /> 
            </View>
        </ScrollView>
    )
}

const Item = ({drink}) => {
    return (
        <View >
            <Text>{drink.title}</Text>
            <Image source={drink.img}></Image>
        </View>
    )
}  
