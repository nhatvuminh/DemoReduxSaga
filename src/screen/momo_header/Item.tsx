import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const ICON_SIZE = 15;
export interface ItemIconProps {
  icon: string;
  title?: string;
}
interface ItemMomoHeaderProps {
  item: ItemIconProps;
  index: number;
  offsetY: Animated.SharedValue<number>;
}
export const MIN_HEADER_HEIGHT = 50;
export const MAX_HEADER_HEIGHT = 150;

export const TITLES: ItemIconProps[] = [
  {
    icon: 'search',
  },
  {
    icon: 'log-out',
    title: 'Nạp tiền',
  },
  {
    icon: 'dollar-sign',
    title: 'Rút tiền',
  },
  {
    icon: 'sidebar',
    title: 'Thanh toán',
  },
  {
    icon: 'maximize',
    title: 'Quét mã',
  },
  {
    icon: 'bell',
  },
  {
    icon: 'user',
  },
];

const { width } = Dimensions.get('window');
export const PADDING_HORIZONTAL = 30;
export const MARGIN_FOUR_ITEM = 20;
export const ITEM_WIDTH = 40;
export const ITEMS_CAN_TRANSLATE = TITLES.filter(el => !!el.title);
export const ITEM_WIDTH_BEFORE = width / TITLES.length;
export const PADDING_ITEM_NO_TRANSLATE = (ITEM_WIDTH_BEFORE - ICON_SIZE) / 2;
export const PADDING_ITEM_TRANSLATE = (ITEM_WIDTH_BEFORE - ICON_SIZE * 2) / 2;
export const ITEM_WIDTH_AFTER = width / 4;

const ItemMomoHeader = ({ item, index, offsetY }: ItemMomoHeaderProps) => {
  return (
    <View style={[{ flex: 1, alignItems: 'center' }]}>
      {ITEMS_CAN_TRANSLATE.includes(item) ? (
        <View
          style={{
            opacity: 0,
          }}>
          <FeatherIcon name={item.icon} size={ICON_SIZE} color={'black'} />
        </View>
      ) : (
        <View>
          <FeatherIcon name={item.icon} size={ICON_SIZE} color={'white'} />
        </View>
      )}
    </View>
  );
};
export default ItemMomoHeader;
