import React, { useState } from 'react';
import { Image, Text, StatusBar, SafeAreaView, View, ScrollView, Flatlist, TouchableOpacity, Dimensions } 
from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { foods } from './FoodList.js';
import { useNavigation } from '@react-navigation/native';
 
export default function Foods() {

    const navigation = useNavigation()
    const SLIDER_WIDTH = Dimensions.get('window').width + 80;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

        /* let foodSelection = [];
            for (let i = 0; i < 20; i++) {
        foodSelection = [...foods, ...foodSelection];
        } */

    return (
        <ScrollView style={defaultStyle.navMargin}>
        <View style={{ flex: 1, alignItems: 'center' }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Kategoriat</Text>
            <View style={defaultStyle.infoLine} />
        </View>
        <ScrollView >
            {foods.map((f,i) => {
                return (
                    <View style={defaultStyle.recipeItem}>
                        <Text key={i} style={defaultStyle.carouselTitle}>{f.title}</Text>
                        <Image source={f.img} style={{width: ITEM_WIDTH,height: 300, marginLeft: 10, marginBottom: 20}}></Image>
                    </View>
                )
            })} 
        </ScrollView>
                {/* <View >
                    <Flatlist
                        data={foods}
                        renderItem={({item}) => <Item food={item}></Item>}  
                    /> 
                </View> */}
        </ScrollView>
    );

    
    // Testailuja, millä eri tavoilla saadaan kuvat nätisti listoiksi. 
    // Vaati jostain syystä hyvin paljon aikaa, ei mennyt kuten strömssössä.
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

}


/* const Item = ({food}) => {
    return (
        <View >
            <Text>{food.title}</Text>
            <Image source={food.img}></Image>
        </View>
    ) 
}   */ 