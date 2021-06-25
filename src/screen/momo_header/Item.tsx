import React, { ReactElement } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Dimensions, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { HEADER_HEIGHT } from './MomoHeader';

const { width, height } = Dimensions.get('window');

const ICON_SIZE = 15;
const PADDING_HORIZONTAL = 40;
const MARGIN_ITEM = 20;
const ITEM_WIDTH =
  (width - 2 * PADDING_HORIZONTAL - 3 * MARGIN_ITEM) / 4 + MARGIN_ITEM;

type ItemProps = {
  index: number;
  offsetY: Animated.SharedValue<number>;
};

export default ({ index, offsetY }: ItemProps) => {
  const shouldTranslation =
    index === 1 || index === 2 || index === 3 || index === 4;
  const titles: string[] = [
    'NẠP TIỀN',
    'RÚT TIỀN',
    'MÃ THANH TOÁNNN',
    'QUÉT MÃ',
  ];

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [1, 1, 0, 0],
    ),
  }));
  const opacityStyles1 = useAnimatedStyle(() => ({
    opacity: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [1, 1, 0, 0],
    ),
  }));

  const searchStyles = useAnimatedStyle(() => ({
    width: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [
        (5 * width) / 7 - (width / 7 - ICON_SIZE) / 2,
        (5 * width) / 7 - (width / 7 - ICON_SIZE) / 2,
        0,
        0,
      ],
    ),
  }));

  const styles0 = useAnimatedStyle(() => ({
    right: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [(2 * width) / 7, (2 * width) / 7, (6 * width) / 7, (6 * width) / 7],
    ),
  }));

  const styles1 = useAnimatedStyle(() => ({
    top: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [HEADER_HEIGHT - 45, HEADER_HEIGHT - 45, 15, 15],
    ),
    left: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [
        ((index - 1) * width) / 4,
        ((index - 1) * width) / 4,
        (index * width) / 7,
        (index * width) / 7,
      ],
    ),
    right: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [
        ((4 - index) * width) / 4,
        ((4 - index) * width) / 4,
        ((6 - index) * width) / 7,
        ((6 - index) * width) / 7,
      ],
    ),
  }));

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          offsetY.value,
          [-10, 0, HEADER_HEIGHT, 200],
          [1.5, 1.5, 1, 1],
        ),
      },
    ],
  }));

  const textStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          offsetY.value,
          [-10, 0, HEADER_HEIGHT, 200],
          [1, 1, 0, 0],
        ),
      },
    ],
    marginTop: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [15, 15, 0, 0],
    ),
    height: interpolate(
      offsetY.value,
      [-10, 0, HEADER_HEIGHT, 200],
      [20, 20, 0, 0],
    ),
  }));

  const Icon = ({ color }: { color?: boolean }): ReactElement => {
    const ic_color = color ? 'black' : 'white';
    switch (index) {
      case 0:
        return (
          <FeatherIcon name={'search'} size={ICON_SIZE} color={ic_color} />
        );
      case 1:
        return (
          <FeatherIcon name={'log-out'} size={ICON_SIZE} color={ic_color} />
        );
      case 2:
        return (
          <FeatherIcon name={'dollar-sign'} size={ICON_SIZE} color={ic_color} />
        );
      case 3:
        return (
          <FontAwesomeIcon name={'barcode'} size={ICON_SIZE} color={ic_color} />
        );
      case 4:
        return (
          <FeatherIcon name={'maximize'} size={ICON_SIZE} color={ic_color} />
        );
      case 5:
        return <FeatherIcon name={'bell'} size={ICON_SIZE} color={ic_color} />;
      case 6:
        return <FeatherIcon name={'user'} size={ICON_SIZE} color={ic_color} />;
      default:
        return (
          <FeatherIcon name={'search'} size={ICON_SIZE} color={ic_color} />
        );
    }
  };

  return index === 0 ? (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 15,
          left: 0,
          height: 30,
        },
        styles0,
      ]}>
      <Animated.View
        style={[
          {
            flex: 1,
            marginLeft: (width / 7 - ICON_SIZE) / 2,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
          },
          searchStyles,
        ]}>
        <TextInput
          placeholder={'Tìm kiếm'}
          placeholderTextColor={'gray'}
          style={{
            width: '100%',
            height: 30,
            paddingVertical: 5,
            paddingLeft: 25,
            paddingRight: 10,
          }}
        />
        <View style={{ position: 'absolute', top: 15 / 2, bottom: 0, left: 5 }}>
          <FeatherIcon name={'search'} size={ICON_SIZE} color={'white'} />
          <Animated.View style={[{ position: 'absolute' }, opacityStyles]}>
            <FeatherIcon name={'search'} size={ICON_SIZE} color={'black'} />
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  ) : shouldTranslation ? (
    <Animated.View
      style={[
        {
          position: 'absolute',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles1,
      ]}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
          scaleStyles,
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -3,
              right: -3,
              left: -3,
              bottom: -3,
              backgroundColor: 'white',
              borderRadius: 5,
            },
            opacityStyles1,
          ]}
        />
        <Icon />
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            opacityStyles,
          ]}>
          <Icon color />
        </Animated.View>
      </Animated.View>
      <Animated.Text
        style={[
          {
            fontSize: 11,
            color: 'white',
          },
          textStyles,
        ]}>
        {titles[index - 1]}
      </Animated.Text>
    </Animated.View>
  ) : (
    <View
      style={{
        position: 'absolute',
        top: 15,
        left: (index * width) / 7,
        right: ((6 - index) * width) / 7,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon />
    </View>
  );
};
