import React from 'react';
import { Image, Text, StatusBar, View, ScrollView, Flatlist, Dimensions } from 'react-native';
import { defaultStyle } from '../styles/styles.js';
import { drinks } from './DrinkList.js';
import { useNavigation } from '@react-navigation/native';


export default function Drinks() {

    const navigation = useNavigation();
    const SLIDER_WIDTH = Dimensions.get('window').width + 80;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

    // Testailuja jätetty näkyville, normaalitapauksessa siivoiltais pois.
    /* let drinkSelection = [];
    for (let i = 0; i < 20; i++) {
        drinkSelection = [...drinks, ...drinkSelection];
    }  */

    return (
        <ScrollView style={defaultStyle.navMargin}>
            <View style={{ flex: 1, alignItems: 'center' }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Kategoriat</Text>
            <View style={defaultStyle.infoLine} />
            </View>
            <ScrollView >
            {drinks.map((d,i) => {
                return (
                    <View style={defaultStyle.recipeItem}>
                        <Text key={i} style={defaultStyle.carouselTitle}>{d.title}</Text>
                        <Image source={d.img} style={{width: ITEM_WIDTH, height: 300, marginLeft: 10, marginBottom: 20}}></Image>
                    </View>
                )
            })}
            </ScrollView>
            {/* <View > 
                <Flatlist
                data={drinks}
                renderItem={({item}) => <Item drink={item}></Item>}  
                /> 
            </View> */}
        </ScrollView>
    )
}

/* const Item = ({drink}) => {
    return (
        <View >
            <Text>{drink.title}</Text>
            <Image source={drink.img}></Image>
        </View>
    )
}  */ 
