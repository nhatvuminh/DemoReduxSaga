import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useFoods } from './context';
import Tab from './Tab';
import { IMAGE_HEADER_HEIGHT } from './UberEat';

type TabProps = {
  y: Animated.SharedValue<number>;
};

type MeasumentTabHeader = {
  width: number;
  x: number;
};

export default ({ y }: TabProps) => {
  const { foods, measurements } = useFoods();
  const index = useSharedValue(0);

  const indexTab = useDerivedValue(() => {
    foods.forEach((__, i) => {
      if (i === foods.length - 1) {
        if (y.value >= measurements[i]) {
          index.value = withTiming(i);
        }
      } else {
        if (y.value >= measurements[i] && y.value <= measurements[i + 1]) {
          index.value = withTiming(i);
        } else if (y.value <= measurements[0]) {
          index.value = withTiming(0);
        }
      }
    });

    return index.value;
  }, [y.value, measurements, index.value]);

  const [measumentTabHeader, setMeasumentTabHeader] = useState<
    MeasumentTabHeader[]
  >(foods.map((el, i) => ({ width: 0, x: 0 })));

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [-100, 0, IMAGE_HEADER_HEIGHT + 1, IMAGE_HEADER_HEIGHT + 70],
      [0, 0, 0, 1],
    ),
    transform: [
      {
        translateX: interpolate(
          indexTab.value,
          measurements.map((_, i) => i),
          measumentTabHeader.map((tab, i) => -tab.x),
        ),
      },
    ],
  }));

  const viewStyles = useAnimatedStyle(() => ({
    width: interpolate(
      indexTab.value,
      measurements.map((_, i) => i),
      measumentTabHeader.map((tab, i) => tab.width),
    ),
    transform: [
      {
        translateX: interpolate(
          indexTab.value,
          measurements.map((_, i) => i),
          measumentTabHeader.map((tab, i) => tab.x),
        ),
      },
    ],
  }));

  const onLayout = (e: LayoutChangeEvent, i: number) => {
    measumentTabHeader[i] = {
      width: e.nativeEvent.layout.width,
      x: e.nativeEvent.layout.x,
    };
    setMeasumentTabHeader([...measumentTabHeader]);
  };

  const setIndexTab = (i: number) => {
    index.value = withTiming(i);
  };

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
        },
        animatedStyles,
      ]}>
      <Animated.View
        style={[
          {
            backgroundColor: 'black',
            borderRadius: 25,
            position: 'absolute',
            top: 5,
            bottom: 5,
            left: 0,
            right: 0,
          },
          viewStyles,
        ]}
      />
      {foods.map((item, index) => {
        return (
          <View key={index} onLayout={e => onLayout(e, index)}>
            <Tab
              y={y}
              item={item}
              index={index}
              indexTab={indexTab}
              setIndexTab={setIndexTab}
            />
          </View>
        );
      })}
    </Animated.View>
  );
};
