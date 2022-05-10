import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ItemMomoHeader, {
  ICON_SIZE,
  ITEMS_CAN_TRANSLATE,
  ITEM_WIDTH,
  ITEM_WIDTH_AFTER,
  ITEM_WIDTH_BEFORE,
  MARGIN_FOUR_ITEM,
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_ITEM_TRANSLATE,
  TITLES,
} from './Item';
import FeatherIcon from 'react-native-vector-icons/Feather';

type MomoHeaderProps = {
  offsetY: Animated.SharedValue<number>;
};

export default ({ offsetY }: MomoHeaderProps) => {
  const containerStyles = useAnimatedStyle(() => ({
    height: interpolate(
      offsetY.value,
      [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      [MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT, 0],
      Extrapolate.CLAMP,
    ),
  }));
  return (
    <View
      style={{
        zIndex: 1,
      }}>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            height: MIN_HEADER_HEIGHT,
            alignItems: 'center',
            backgroundColor: '#496650',
          },
        ]}>
        {TITLES.map((item, index) => (
          <ItemMomoHeader {...{ key: index, item, index, offsetY }} />
        ))}
      </Animated.View>
      <Animated.View
        style={[{ backgroundColor: '#79873A' }, containerStyles]}
      />
      {ITEMS_CAN_TRANSLATE.map((item, index) => {
        const offsetX =
          (index + 1) * ITEM_WIDTH_BEFORE + PADDING_ITEM_TRANSLATE;
        const itemStyle = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateX: interpolate(
                  offsetY.value,
                  [0, 20, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
                  [
                    PADDING_HORIZONTAL + index * ITEM_WIDTH_AFTER - offsetX,
                    PADDING_HORIZONTAL + index * ITEM_WIDTH_AFTER - offsetX,
                    0,
                  ],
                  Extrapolate.CLAMP,
                ),
              },
              {
                translateY: interpolate(
                  offsetY.value,
                  [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
                  [MAX_HEADER_HEIGHT - ITEM_WIDTH_AFTER, 0],
                  Extrapolate.CLAMP,
                ),
              },
            ],
          };
        });
        const textStyle = useAnimatedStyle(() => ({
          opacity: interpolate(
            offsetY.value,
            [0, MIN_HEADER_HEIGHT],
            [1, 0],
            Extrapolate.CLAMP,
          ),
          transform: [
            {
              scaleX: interpolate(
                offsetY.value,
                [0, MIN_HEADER_HEIGHT],
                [1, 0],
                Extrapolate.CLAMP,
              ),
            },
          ],
        }));
        return (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: (MIN_HEADER_HEIGHT - ICON_SIZE * 2) / 2,
                left: offsetX,
                alignItems: 'center',
              },
              itemStyle,
            ]}
            key={index}>
            <View
              style={[
                {
                  backgroundColor: 'white',
                  width: ICON_SIZE * 2,
                  height: ICON_SIZE * 2,
                  borderRadius: ICON_SIZE - 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <FeatherIcon name={item.icon} size={ICON_SIZE} color={'black'} />
            </View>
            {/* <Animated.Text
              adjustsFontSizeToFit
              style={[{ color: 'white', fontSize: 12 }, textStyle]}>
              {item.title}
            </Animated.Text> */}
          </Animated.View>
        );
      })}
    </View>
  );
};
