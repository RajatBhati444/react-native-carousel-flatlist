import React, {useEffect} from 'react';
import {FlatList, Image, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

function App() {
  const {height, width} = useWindowDimensions();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1000});
  }, [opacity]);

  return (
    <FlatList
      data={SLIDES}
      horizontal
      renderItem={({item}) => (
        <Fade>
          <Image style={[{height, width}]} source={{uri: item.image}} />
        </Fade>
      )}
      pagingEnabled
    />
  );
}

export default App;

function Fade(props: any) {
  const {children, config = {duration: 700}} = props;
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, config);
    return () => {
      opacity.value = withTiming(0, config);
    };
  }, [config, opacity]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
