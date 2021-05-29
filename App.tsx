import React, {useCallback, useEffect, useState} from 'react';
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
      'https://images.pexels.com/photos/7664100/pexels-photo-7664100.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'April showers, may flowers.',
  },{
    image:
      'https://images.pexels.com/photos/7793853/pexels-photo-7793853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'May2  showers, may flowers.',
  },{
    image:
      'https://images.pexels.com/photos/1535985/pexels-photo-1535985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Spring',
    subtitle: 'Jann widow, may flowers.',
  },
];

function App() {
  const {height, width} = useWindowDimensions();
  const opacity = useSharedValue(0);
  const [activeIndex, setActiveindex]= useState(null);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1000});
  }, [opacity]);

  const onViewRef = React.useRef((viewableItems: any) => {
    console.log('active index: ', viewableItems?.viewableItems[0]?.index);
    setActiveindex(viewableItems?.viewableItems[0]?.index);
  });

  const viewConfigRef = React.useRef({
    // viewAreaCoveragePercentThreshold: 50,
    itemVisiblePercentThreshold: 75, 
    waitForInteraction: true});

    const Fade2=useCallback(
      (props: any) => {
        const {children, config = {duration: 700}, activeIndex} = props;
  console.log({activeIndex});
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, config);
    return () => {
      opacity.value = withTiming(0, config);
    };
  }, [config, opacity, activeIndex]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
      },
      [activeIndex],
    )

  return (
    <FlatList
      data={SLIDES}
      horizontal
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      renderItem={
        ({item, index}) => 
       {
         console.log(activeIndex===index,activeIndex,index,'activeIndex===index');
         return <Fade2 config={{duration: activeIndex===index? 3000: 0}} activeIndex={activeIndex}>
          <Image style={[{height, width}]} source={{uri: item.image}} />
        </Fade2>
        
      }
      }
      pagingEnabled
    />
  );
}

export default App;

function Fade(props: any) {
  const {children, config = {duration: 700}, activeIndex} = props;
  console.log({activeIndex});
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, config);
    return () => {
      opacity.value = withTiming(0, config);
    };
  }, [config, opacity, activeIndex]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
