import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { IMAGE_HEADER_HEIGHT } from './UberEat';

type HeaderImageProps = {
  y: Animated.SharedValue<number>;
};

const { width } = Dimensions.get('window');

const food_image =
  'https://dianechamberlain.com/wp-content/uploads/2014/09/sushi.jpg';

export default ({ y }: HeaderImageProps) => {

  const animationStyles = useAnimatedStyle(() => ({
    height: interpolate(
      y.value,
      [-1, 0],
      [IMAGE_HEADER_HEIGHT + 1, IMAGE_HEADER_HEIGHT],
      { extrapolateRight: Extrapolate.CLAMP },
    ),
    top: interpolate(y.value, [0, 100], [0, -100], {
      extrapolateLeft: Extrapolate.CLAMP,
    }),
  }));

  return (
    <Animated.Image
      source={{ uri: food_image }}
      style={[
        { width: width, height: IMAGE_HEADER_HEIGHT, position: 'absolute' },
        animationStyles,
      ]}
    />
  );
};
