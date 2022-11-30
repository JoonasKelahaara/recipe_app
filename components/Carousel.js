import React from "react";
import { Text, View, Image } from 'react-native'
import {defaultStyle} from '../styles/styles.js';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH, data } from './CarouselCardItem';

const CarouselCards = () => {
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    return (
      <View>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    )
  }
  
  export default CarouselCards


/* export class CarouselCards extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Pääruoka",
              imgUrl: '../img/carousel_maindish.png', 
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
