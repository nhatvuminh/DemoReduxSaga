import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import Animated, { event, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SharedElement } from 'react-navigation-shared-element';
import { ListPostNavigationProp } from './ListPost';
import { Post } from './Model';

export const { width, height } = Dimensions.get('window');
export const HEIGHT_IMAGE = width - 100;

interface PostItemProps {
  post: Post;
  index: number;
  isLastIndex: boolean;
}

export default ({ post, isLastIndex }: PostItemProps) => {
  const navigation = useNavigation();
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const [sizeImage, setSizeImage] = useState({ width: 1, height: 1 });
  const [opacity, setOpacity] = useState(1);
  const imageHeight = useMemo(() => {
    return (sizeImage.height * width) / sizeImage.width;
  }, [sizeImage]);

  useFocusEffect(
    useCallback(() => {
      setOpacity(1);
    }, []),
  );

  useEffect(() => {
    Image.getSize(post.post_image, (width, height) => {
      setSizeImage({ width, height });
    });
  }, []);

  const _baseScale: Animated.SharedValue<number> = useSharedValue(1);
  const _pinchScale: Animated.SharedValue<number> = useSharedValue(1);
  const _scale = _baseScale.value * _pinchScale.value;
  let _lastScale = 1;
  const onPinchGestureEvent = event(
    [{ nativeEvent: { scale: _pinchScale.value } }],
    {
      useNativeDriver: true,
    },
  );

  const onPinchStateChange = (
    event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.value = _lastScale;
      _pinchScale.value = 1;
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          paddingBottom: isLastIndex ? paddingBottom : 0,
        },
      ]}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
            <Image
              source={{
                uri: post.avatar,
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              resizeMode={'cover'}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>
                {post.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={{ marginRight: 5, fontSize: 14 }}>12 thg 4</Text>
                <Icon
                  name={'genderless'}
                  size={3}
                  color={'black'}
                  style={{ marginRight: 5, color: 'black' }}
                />
                <Icon name={'globe-asia'} size={12} />
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 16 }}>{post.description}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpacity(0);
          navigation.navigate('DetailPost', {
            post,
            height: imageHeight,
          });
        }}>
        <SharedElement id={`${post.post_id}`}>
          <View style={[{ width, height: imageHeight }]}>
            <Image
              source={{ uri: post.post_image }}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  resizeMode: 'cover',
                },
                { opacity },
              ]}
              resizeMode={'contain'}
            />
          </View>
        </SharedElement>
      </TouchableWithoutFeedback>
    </View>
  );
};
