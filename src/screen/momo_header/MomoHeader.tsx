import React from 'react';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Item from './Item';

type MomoHeaderProps = {
  offsetY: Animated.SharedValue<number>;
};

export const HEADER_HEIGHT = 120;

export default ({ offsetY }: MomoHeaderProps) => {
  const { top } = useSafeAreaInsets();

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
