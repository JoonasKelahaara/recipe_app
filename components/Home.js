import { Text, ScrollView} from 'react-native';
import {defaultStyle} from '../styles/styles.js';
import React from "react";
//import Carousel from './Carousel';

export default function Home() {

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <Text>Home</Text> 
    </ScrollView>
   

  );
}    
