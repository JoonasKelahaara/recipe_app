import { Text, Image, View, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import {defaultStyle} from '../styles/styles.js';
import React from 'react';
//import CarouselCards from './Carousel';
import { useNavigation } from '@react-navigation/native';
import AddRecipe from './Recipe/AddRecipe.js';

export default function Home({ name, name2 }) {

  const navigation = useNavigation();
  const SLIDER_WIDTH = Dimensions.get('window').width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

    return(
      <ScrollView style={defaultStyle.navMargin}>
        <View style={{ flex: 1, alignItems: 'center' }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={[defaultStyle.infoHeader, {marginBottom: 15}]}>Pääkategoriat</Text>
            <View style={defaultStyle.infoLine} />
            </View>
        <ScrollView >
        {/* <SafeAreaView style={defaultStyle.carouselContainer}>  
          <CarouselCards name={name} name2={name2}/>
        </SafeAreaView> */}
          <View style={defaultStyle.recipeItem}>
          <TouchableOpacity  activeOpacity={0.6} onPress={() => navigation.navigate(name)}>
            <Text style={defaultStyle.carouselTitle}>Ruoat</Text>
            <Image source={require("../img/carousel_maindish.png")}
              style={{width: ITEM_WIDTH,
              height: 300,
              marginLeft: 4, 
              marginBottom: 20
              }}>
            </Image>
          </TouchableOpacity>
          </View>
          <View style={defaultStyle.recipeItem}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(name2)}>
            <Text style={defaultStyle.carouselTitle}>Juomat</Text>
            <Image source={require("../img/carousel_drinks.png")}
              style={{width: ITEM_WIDTH,
              height: 300,
              marginLeft: 4, 
              marginBottom: 20}}>
            </Image>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>

  );
}    
