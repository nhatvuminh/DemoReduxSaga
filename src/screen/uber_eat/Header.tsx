import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/core';
import TabHeader from './TabHeader';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ICON_BACK_SIZE, IMAGE_HEADER_HEIGHT } from './UberEat';

type NavigationProp = StackNavigationProp<RootStackParamList, 'UberEat'>;

type HeaderProps = {
  y: Animated.SharedValue<number>;
};

export default ({ y }: HeaderProps) => {
  const navigation = useNavigation<NavigationProp>();

  const { top } = useSafeAreaInsets();

  const goBack = () => navigation.goBack();

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, [0, IMAGE_HEADER_HEIGHT], [0, 1]),
  }));

  const bgHeaderStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [0, IMAGE_HEADER_HEIGHT - 15, IMAGE_HEADER_HEIGHT - 10],
      [0, 0, 1],
    ),
  }));

  const titleStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          y.value,
          [-100, 0, IMAGE_HEADER_HEIGHT, IMAGE_HEADER_HEIGHT + 100],
          [-ICON_BACK_SIZE + 10, -ICON_BACK_SIZE + 10, 15, 15],
        ),
      },
      {
        translateY: interpolate(
          y.value,
          [-100, 0, IMAGE_HEADER_HEIGHT, IMAGE_HEADER_HEIGHT + 100],
          [
            IMAGE_HEADER_HEIGHT - top + 10 + 100,
            IMAGE_HEADER_HEIGHT - top + 10,
            0,
            0,
          ],
        ),
      },
    ],
  }));

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
      }}>
      <Animated.View
        style={[
          { ...StyleSheet.absoluteFillObject, backgroundColor: 'white' },
          bgHeaderStyles,
        ]}
      />
      <View
        style={{
          paddingTop: top,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={goBack}>
            <FeatherIcon
              name={'arrow-left'}
              size={ICON_BACK_SIZE}
              color={'white'}
            />
            <Animated.View
              style={[{ ...StyleSheet.absoluteFillObject }, animatedStyles]}>
              <FeatherIcon
                name={'arrow-left'}
                size={ICON_BACK_SIZE}
                color={'black'}
              />
            </Animated.View>
          </TouchableOpacity>
          <Animated.Text
            style={[
              {
                fontSize: 25,
                fontWeight: 'bold',
              },
              titleStyles,
            ]}>
            PAOK Restaurant
          </Animated.Text>
        </View>
        <View style={{ flexWrap: 'wrap' }}>
          <TouchableOpacity>
            <Icon name={'heart'} size={ICON_BACK_SIZE} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <TabHeader y={y} />
    </View>
  );
};
