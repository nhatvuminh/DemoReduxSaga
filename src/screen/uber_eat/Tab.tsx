import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useFoods } from './context';
import { IMAGE_HEADER_HEIGHT, KindOfFood } from './UberEat';

export default ({
  y,
  index,
  item,
  indexTab,
  setIndexTab,
}: {
  y: Animated.SharedValue<number>;
  index: number;
  item: KindOfFood;
  indexTab: Animated.SharedValue<number>;
  setIndexTab: (index: number) => void;
}) => {
  const opacityStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      indexTab.value,
      [index - 1, index, index + 1],
      ['black', 'white', 'black'],
    ),
  }));

  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => setIndexTab(index)}>
        <Animated.Text style={[{ fontSize: 15 }, opacityStyles]}>
          {item.title}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};
