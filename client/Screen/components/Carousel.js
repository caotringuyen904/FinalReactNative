import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';

import { getRestaurants } from '../../serverConnect/index';

const Carousel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [carouselSlides, setCarouselSlides] = useState([]);

  const getData = async () => {
    try {
      const response = await getRestaurants();
      const restaurantData = response.data?.restaurants || [];
      setRestaurants(restaurantData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const slides = useMemo( () => restaurants.map(restaurant => 
      ({
        uri: restaurant.images.length > 0 ? restaurant.images[0] : '',
        key: restaurant._id,
      })),
  [restaurants]
  );
  useEffect(() => {
    setCarouselSlides(slides);
  }, [slides]);

  // console.log('restaurants', restaurants);

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={carouselSlides}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        imageComponentStyle={styles.imageStyle}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 15,
    width: '90%',
    marginTop: 20,
  },
});
