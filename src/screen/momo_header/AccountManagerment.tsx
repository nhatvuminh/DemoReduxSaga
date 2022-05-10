import React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from './Item';

interface AccountManagermentProps {
  offsetY: Animated.SharedValue<number>;
}

const AccountManagerment = ({ offsetY }: AccountManagermentProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const x = useAnimatedStyle(() => ({
    marginTop: interpolate(
      offsetY.value,
      [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      [top + MAX_HEADER_HEIGHT, top + MIN_HEADER_HEIGHT],
      Extrapolate.CLAMP,
    ),
  }));
  return (
    <Animated.View
      style={[
        {
          // marginTop: top + MAX_HEADER_HEIGHT,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderBottomColor: '#E7E7E7',
          borderBottomWidth: 1,
          backgroundColor: 'white'
        },
        x,
      ]}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 5 }}>{'Ví của tôi'}</Text>
          <FeatherIcon name="eye" size={15} />
        </View>
        <Text style={{ fontWeight: 'bold' }}>{'9.099đ'}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{'Quản lý tài khoản'}</Text>
        <FeatherIcon name="chevron-right" size={15} />
      </View>
    </Animated.View>
  );
};

export default AccountManagerment;
