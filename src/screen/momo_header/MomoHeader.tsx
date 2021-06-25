import React from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Item from './Item';

type MomoHeaderProps = {
  offsetY: Animated.SharedValue<number>;
};

export const HEADER_HEIGHT = 120;

export default ({ offsetY }: MomoHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const translationY = useAnimatedStyle(() => ({
    height: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [HEADER_HEIGHT, HEADER_HEIGHT, 60, 60],
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          // position: 'absolute',
          // top,
          // left: 0,
          // right: 0,
          backgroundColor: 'gray',
          flexDirection: 'row',
          paddingTop: 15,
          zIndex: 1,
        },
        translationY,
      ]}>
      {Array(7)
        .fill(7)
        .map((__, index) => {
          return <Item key={index} index={index} offsetY={offsetY} />;
        })}
    </Animated.View>
  );
};
