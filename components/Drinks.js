import React from 'react';
import { Image, StatusBar, View, ScrollView, Flatlist } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { drinks } from './DrinkList.js';


export default function DrinkPics() {

    let drinkSelection = [];
    for (let i = 0; i < 20; i++) {
        drinkSelection = [...drinks, ...drinkSelection];
    } 



    return (
        <ScrollView /* style={defaultStyle.foodContainer} */>
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
        <View /* style={defaultStyle.foodCard} */>
            <Text>{drink.title}</Text>
            <Image /* style={defaultStyle.foodImage} */ source={drink.img}></Image>
        </View>
    )
}   