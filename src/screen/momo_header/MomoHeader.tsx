import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Item from './Item';

type MomoHeaderProps = {
  offsetY: Animated.Value<number>;
};

export const HEADER_HEIGHT = 120;

export default ({ offsetY }: MomoHeaderProps) => {
  const { top } = useSafeAreaInsets();

  // const height = useDerivedValue(() => {
  //   return (
  //     top +
  //     (HEADER_HEIGHT - offsetY.value > 60
  //       ? HEADER_HEIGHT - offsetY.value > 120
  //         ? HEADER_HEIGHT
  //         : HEADER_HEIGHT - offsetY.value < 0
  //         ? 0
  //         : HEADER_HEIGHT - offsetY.value
  //       : 60)
  //   );
  // });

  // const animateHeight = useAnimatedStyle(() => ({
  //   height: height.value,
  // }));

  

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          flexDirection: 'row',
          zIndex: 1,
        },
        animateHeight,
      ]}>
      <Animated.View
        style={[
          {
            flex: 1,
            marginTop: top,
            flexDirection: 'row',
            backgroundColor: 'gray',
          },
        ]}>
        {Array(7)
          .fill(7)
          .map((__, index) => {
            return <Item key={index} index={index} offsetY={offsetY} />;
          })}
      </Animated.View>
    </Animated.View>
  );
};
