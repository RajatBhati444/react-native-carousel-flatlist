import React, {useEffect, useState} from 'react';
import {FlatList, Image, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
      'https://images.pexels.com/photos/7664100/pexels-photo-7664100.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'April showers, may flowers.',
  },
  {
    image:
      'https://images.pexels.com/photos/7793853/pexels-photo-7793853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'May2  showers, may flowers.',
  },
  {
    image:
      'https://images.pexels.com/photos/1535985/pexels-photo-1535985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'Jann widow, may flowers.',
  },
];

function App() {
  const {height, width} = useWindowDimensions();
  const [x, setX] = useState(0);

  return (
    <FlatList
      data={SLIDES}
      horizontal
      renderItem={({item, index}) => {
        return (
          <Slide
            item={item}
            height={height}
            width={width}
            x={x}
            index={index}
          />
        );
      }}
      pagingEnabled
      onScroll={ev => {
        setX(ev.nativeEvent.contentOffset.x);
      }}
    />
  );
}

export default App;

function Slide(props: any) {
  const {height, width, item, index, x} = props;
  const _x = useSharedValue(0);
  console.log({
    x,
    width,
  });
  const active = index === Math.abs(Math.floor((x + width) / width));

  const opacity = useSharedValue(1);
  // const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    _x.value = x;
    if (active) {
      console.log({_: index + 1.0 - (x + width) / width});
      opacity.value = index + 1.0 - (x + width) / width;
    } else {
      console.log({__: Math.abs(3 - (x + width) / width)});
      opacity.value = Math.abs(3 - (x + width) / width);
    }
  }, [_x, active, index, opacity, width, x]);

  // useEffect(() => {
  //   if (active) {
  //     opacity.value = withTiming(1, {duration: 1000});
  //   } else {
  //     opacity.value = withTiming(0.8, {duration: 1000});
  //   }
  // }, [opacity, active, scale]);

  return (
    <Animated.View style={animatedStyle}>
      <Image style={[{height, width}]} source={{uri: item.image}} />
    </Animated.View>
  );
}
