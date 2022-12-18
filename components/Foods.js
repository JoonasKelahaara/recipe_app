import React, { useState } from 'react';
import { Image, Text, StatusBar, SafeAreaView, View, ScrollView, Flatlist, TouchableOpacity } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { foods } from './FoodList.js';
import { useNavigation } from '@react-navigation/native';
 
export default function Foods() {

    /*     const Item = ({ item, onPress, backgroundColor, textColor }) => (
            <TouchableOpacity onPress={onPress} >
                <Text>{item.title}</Text>
                <Image>{item.img}</Image>
            </TouchableOpacity>
        );

        const Foods = () => {
            const [selectedId, setSelectedId] = useState(null);

            const renderItem = ({ item }) => {
                const backgroundColor = item.id === selectedId ?
                "#E8F3E8" : "#808080";
                const color = item.id === selectedId ? 
                "#0A3409" : "#0A3409";

                return (
                    <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }} />
                );
            }

            return (
                <SafeAreaView>
                    <Flatlist
                        data={foods}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}>
                    </Flatlist>
                </SafeAreaView>
            );
        }
        
        export default Foods; */


        const navigation = useNavigation()

        /* let foodSelection = [];
            for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
        } */

        return (
            <ScrollView >
                <Text>testi</Text>
                <Image source={foods.img}></Image>
                {/* <View >
                    <Flatlist
                        data={foods}
                        renderItem={({item}) => <Item food={item}></Item>}  
                    /> 
                </View> */}
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