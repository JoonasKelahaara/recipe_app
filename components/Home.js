import { Text, ScrollView, SafeAreaView} from 'react-native';
import {defaultStyle} from '../styles/styles.js';
import React from "react";
import CarouselCards from './Carousel';


export default function Home({name, name2}) {

    return(
    <ScrollView style={defaultStyle.navMargin}>
        {/* <Text>Home</Text>  */}
      <SafeAreaView style={defaultStyle.carouselContainer}>  
        <CarouselCards name={name} name2={name2}/>
      </SafeAreaView>
    </ScrollView>
   

  );
}    
