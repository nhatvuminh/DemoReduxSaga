import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Post } from './ListPost';

type BackgroundProps = {
  post: Post;
  opacityStyles: Animated.AnimateStyle<ViewStyle>;
  closeStyles1: Animated.AnimateStyle<ViewStyle>;
  closeStyles2: Animated.AnimateStyle<ViewStyle>;
  close: () => void;
};

export default function Background({
  post: { username, description },
  opacityStyles,
  closeStyles1,
  closeStyles2,
  close,
}: BackgroundProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <Animated.View
      pointerEvents={'box-none'}
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          //   width: width,
          //   height: height,
          backgroundColor: 'black',
        },
        opacityStyles,
      ]}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            left: 12,
            top: insets.top + 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
            backgroundColor: 'white',
          },
          closeStyles1,
        ]}>
        <TouchableOpacity onPress={close}>
          <FeatherIcon name={'x'} color={'black'} size={20} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            paddingTop: 10,
            paddingHorizontal: 12,
            backgroundColor: 'rgba(0,0,0,0.2)',
            paddingBottom: insets.bottom + 10,
          },
          closeStyles2,
        ]}>
        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
          {username}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text style={{ marginRight: 5, fontSize: 14, color: 'white' }}>
            12 thg 4
          </Text>
          <Icon
            name={'genderless'}
            size={3}
            color={'black'}
            style={{ marginRight: 5, color: 'white' }}
          />
          <Icon name={'globe-asia'} size={12} color={'white'} />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            marginTop: 10,
            marginBottom: 10,
          }}>
          {description}
        </Text>
        <View style={{ height: 1, backgroundColor: 'white' }} />
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1 / 3,
              justifyContent: 'center',
            }}>
            <Icon name={'thumbs-up'} color={'white'} size={15} />
            <Text style={{ fontSize: 15, color: 'white', marginLeft: 5 }}>
              Thích
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1 / 3,
              justifyContent: 'center',
            }}>
            <Icon
              name={'comment-alt'}
              color={'white'}
              size={15}
              style={{ marginTop: 2 }}
            />
            <Text style={{ fontSize: 15, color: 'white', marginLeft: 5 }}>
              Bình luận
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1 / 3,
              justifyContent: 'center',
            }}>
            <Icon
              name={'share'}
              color={'white'}
              size={15}
              style={{ marginTop: 2 }}
            />
            <Text style={{ fontSize: 15, color: 'white', marginLeft: 5 }}>
              Chia sẻ
            </Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
