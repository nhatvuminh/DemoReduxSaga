import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageProps,
  ImageStyle,
  LayoutChangeEvent,
  NativeScrollEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  HandlerStateChangeEvent,
  PinchGestureHandlerEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  block,
  cond,
  eq,
  Extrapolate,
  interpolate,
  multiply,
  set,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useCode,
  useSharedValue,
  Value,
  withSpring,
  event,
  useDerivedValue,
  runOnJS,
  runOnUI,
  interpolateColor,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Post } from './ListPost';

export const { width, height } = Dimensions.get('window');
export const HEIGHT_IMAGE = width - 100;

interface PostItemProps {
  post: Post;
  index: number;
  panGestureHandler: (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => void;
  animatedStyle: Animated.AnimateStyle<ViewStyle>;
  y: number;
  // onImagePress: (index: number) => void;
  // translateXY: Animated.SharedValue<number>;
}

export default function PostItem({
  post: { post_id, username, post_image, avatar, description },
  index,
  panGestureHandler,
  animatedStyle,
  y
}: // onImagePress,
// translateXY,
PostItemProps) {
  const [enable, setEnable] = useState(false);
  const [sizeImage, setSizeImage] = useState({ width: 1, height: 1 });
  // const [offsetBeginY, setOffsetBeginY] = useState(0);
  const translateXY: Animated.SharedValue<number> = useSharedValue(0);

  const updateEnable = (enable: boolean, index?: number) => {
    setEnable(enable);
    // if (index) setPostSelected(posts[index]);
  };

  const callback = (enable: boolean, index?: number) => {
    'worklet';
    runOnJS(updateEnable)(enable, index);
  };

  const onImagePress = useCallback(
    index => {
      if (!enable) {
        translateXY.value = withSpring(
          1,
          {
            damping: 10,
            stiffness: 80,
          },
          () => callback(true, index),
        );
        // opacity.value = withTiming(1);
      }
    },
    [enable],
  );

  const imageStyles = useAnimatedStyle(() => {
    // console.log('AAA', index, (height - sizeImage.height) / 2);

    return {
      transform: [
        {
          translateY: interpolate(
            translateXY.value,
            [0, 1],
            [0, 100],
            Extrapolate.EXTEND,
          ),
        },
      ],
    };
  }, []);

  // const onLayoutImage = (event: LayoutChangeEvent) => {
  //   setOffsetBeginY(event.nativeEvent.layout.y);
  // };

  useEffect(() => {
    Image.getSize(post_image, (width, height) => {
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

  const containerStyles = useAnimatedStyle(() => ({
    zIndex: interpolate(translateXY.value, [0, 1], [0, 100]),
  }));

  return (
    <View
      style={[
        {
          flex: 1
        },
      ]}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
            <Image
              source={{
                uri: avatar,
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              resizeMode={'cover'}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>
                {username}
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
          <Text style={{ fontSize: 16 }}>{description}</Text>
        </View>
      </View>

      <PanGestureHandler onGestureEvent={panGestureHandler} enabled={enable}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            onPress={() => onImagePress(index)}
            activeOpacity={1}>
            {/* <PinchGestureHandler
                  onHandlerStateChange={onPinchStateChange}
                  onGestureEvent={onPinchGestureEvent}> */}
            <Animated.Image
              // onLayout={onLayoutImage}
              source={{ uri: post_image }}
              style={[
                {
                  width: width,
                  height: (sizeImage.height * width) / sizeImage.width,
                },
                imageStyles,
                {
                  transform: [{ scale: _scale }],
                },
              ]}
              resizeMode={'contain'}
            />
            {/* </PinchGestureHandler> */}
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
