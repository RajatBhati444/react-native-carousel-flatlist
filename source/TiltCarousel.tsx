import * as React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SLIDES = [
  {
    image:
      'https://images.pexels.com/photos/6293900/pexels-photo-6293900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Summer',
    subtitle: 'Warm days, fun nights.',
  },
  {
    image:
      'https://images.pexels.com/photos/7175583/pexels-photo-7175583.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Fall',
    subtitle: 'Sweater weather, baby.',
  },
  {
    image:
      'https://images.pexels.com/photos/7721976/pexels-photo-7721976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Winter',
    subtitle: 'The season to be jolly.',
  },
  {
    image:
      'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'April showers, may flowers.',
  },
];

// Utils
const {width, height} = Dimensions.get('window');

/**
 * Tilt Carousel View
 */
export const TiltCarousel = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  console.log({scrollX});
  return (
    <View style={styles.background}>
      <Animated.FlatList
        data={SLIDES}
        renderItem={({item, index}: {item: Slide; index: number}) => (
          <CarouselSlide slide={item} scrollX={scrollX} index={index} />
        )}
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={-1}
        bounces={true}
        keyExtractor={(slide: Slide) => slide.title}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    </View>
  );
};

/**
 * Slide item
 */
const CarouselSlide = ({slide, scrollX, index}: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
  });
  const perspective = scrollX.interpolate({
    inputRange,
    outputRange: [1200, 800, 1200],
  });
  const translateX = Animated.subtract(scrollX, index * width);
  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity,
          transform: [{scale}, {perspective}, {translateX}, {rotateY}],
        },
      ]}>
      <ImageBackground source={{uri: slide.image}} style={{flex: 1}}>
        <View style={{height: 0.7 * height}} />
        <View style={styles.cardContentContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

/**
 * Styling
 */
const styles = StyleSheet.create({
  background: {flex: 1, backgroundColor: 'rgba(30,30,30,0.8)'},
  cardContainer: {
    width,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  cardContentContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 64,
    textShadowColor: 'black',
    textShadowRadius: 4,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  subtitle: {
    color: 'rgb(230,230,230)',
    fontWeight: '600',
    fontSize: 18,
  },
});
