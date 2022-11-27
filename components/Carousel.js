/* import React, {Component} from "react";
import { Text, View, Image } from 'react-native'
import {defaultStyle} from '../styles/styles.js';
import Carousel from 'react-native-snap-carousel';

export class MyCarousel extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Pääruoka",
              index: '../img/carousel_maindish.png', 
          },
          {
              title:"Item 2",
              text: "Juomat",
              index: '../img/carousel_maindish.png',
          },
        ]
      }
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{
                backgroundColor: '#E8F3E8',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25, 
            }}>
                <Text style={{fontSize: 30}}>{ item.title }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
        );
    }
} */


/* import React from "react";
import { Dimensions, Text, Image } from 'react-native';
import {defaultStyle} from '../styles/styles.js';
import Carousel from 'react-native-reanimated-carousel';

function Index() {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

export default Index;  */