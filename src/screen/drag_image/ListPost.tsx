import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {
  GestureEvent,
  PanGestureHandler,
  PinchGestureHandler,
  State,
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
import {useVector} from 'react-native-redash';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

const imageSource =
  'https://bloximages.newyork1.vip.townnews.com/outtherecolorado.com/content/tncms/assets/v3/editorial/f/7a/f7a605a2-64d6-11eb-9680-436517a94fcf/601876d7983f0.image.jpg?crop=837%2C837%2C208%2C0&resize=1200%2C1200&order=crop%2Cresize';
const avatar =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRKUBrihFdqXrl2Nvl7YsT7YB5hz6eSNmcKg&usqp=CAU';
const {width, height} = Dimensions.get('window');
const HEIGHT_IMAGE = width - 100;

interface ListPostProps {}

export default function ListPost({}: ListPostProps) {
  const translateXY: Animated.SharedValue<number> = useSharedValue(0);
  const startingPosition: number = 0;
  const opacity: Animated.SharedValue<number> = useSharedValue(0);
  const x: Animated.SharedValue<number> = useSharedValue(startingPosition);
  const y: Animated.SharedValue<number> = useSharedValue(startingPosition);
  const insets: EdgeInsets = useSafeAreaInsets();
  const offsetY: number = (height - HEIGHT_IMAGE) / 2 - 90 - insets.top;
  const [enable, setEnable] = useState(false);

  const close = () => {
    translateXY.value = 0;
    opacity.value = 0;
    setEnable(false);
  };

  const updateEnable = (enable: boolean) => {
    setEnable(enable);
  };

  const callback = (enable: boolean) => {
    'worklet';
    runOnJS(updateEnable)(enable);
  };

  const onImagePress = useCallback(() => {
    if (!enable) {
      translateXY.value = withSpring(
        1,
        {
          damping: 10,
          stiffness: 80,
        },
        () => callback(true),
      );
      opacity.value = withTiming(1);
    }
  }, [enable]);

  const imageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateXY.value,
          [0, 1],
          [0, offsetY],
          Extrapolate.EXTEND,
        ),
      },
    ],
  }));

  const opacityStyles = useAnimatedStyle(
    () => ({
      opacity: translateXY.value,
      backgroundColor: interpolateColor(
        y.value,
        [0, -height / 2, startingPosition, height / 2],
        ['black', 'transparent', 'black', 'transparent'],
      ),
    }),
    [translateXY.value],
  );

  const closeStyles1 = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      zIndex: translateXY.value,
    }),
    [translateXY.value, opacity.value],
  );

  const closeStyles2 = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      zIndex: translateXY.value,
    }),
    [translateXY.value, opacity.value],
  );

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      x.value = startingPosition;
      y.value = startingPosition;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
      opacity.value = withTiming(0, {duration: 200});
    },
    onEnd: (event, ctx) => {
      if (y.value < -150 || y.value > 150) {
        translateXY.value = withTiming(0, {}, () => callback(false));
        opacity.value = withTiming(0);
        y.value = withTiming(startingPosition);
        x.value = withTiming(startingPosition);
      } else {
        opacity.value = withTiming(1, {
          duration: 500,
          easing: Easing.in(Easing.linear),
        });
        x.value = withTiming(startingPosition, {duration: 300});
        y.value = withTiming(startingPosition, {duration: 300});
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  const _baseScale = useRef(new Value(1)).current;
  const _pinchScale = useRef(new Value(1)).current;
  const _scale = useRef(multiply(_baseScale, _pinchScale)).current;
  let _lastScale: any = 1;
  const onPinchGestureEvent = event([{nativeEvent: {scale: _pinchScale}}], {
    useNativeDriver: true,
  });

  const onPinchStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, paddingTop: insets.top}}>
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 10, marginBottom: 10}}>
            <View
              style={{flexDirection: 'row', marginTop: 10, marginBottom: 5}}>
              <Image
                source={{
                  uri: avatar,
                }}
                style={{width: 40, height: 40, borderRadius: 20}}
                resizeMode={'cover'}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>
                  Kurt Schneider
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text style={{marginRight: 5, fontSize: 14}}>12 thg 4</Text>
                  <Icon
                    name={'genderless'}
                    size={3}
                    color={'black'}
                    style={{marginRight: 5, color: 'black'}}
                  />
                  <Icon name={'globe-asia'} size={12} />
                </View>
              </View>
            </View>
            <Text style={{fontSize: 16}}>A beautiful wild world!</Text>
          </View>
        </View>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'black',
            },
            opacityStyles,
          ]}
        />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
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
            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
              Kurt Schneider
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text style={{marginRight: 5, fontSize: 14, color: 'white'}}>
                12 thg 4
              </Text>
              <Icon
                name={'genderless'}
                size={3}
                color={'black'}
                style={{marginRight: 5, color: 'white'}}
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
              A beautiful wild world!
            </Text>
            <View style={{height: 1, backgroundColor: 'white'}} />
            <View style={{flexDirection: 'row', paddingVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1 / 3,
                  justifyContent: 'center',
                }}>
                <Icon name={'thumbs-up'} color={'white'} size={15} />
                <Text style={{fontSize: 15, color: 'white', marginLeft: 5}}>
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
                  style={{marginTop: 2}}
                />
                <Text style={{fontSize: 15, color: 'white', marginLeft: 5}}>
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
                  style={{marginTop: 2}}
                />
                <Text style={{fontSize: 15, color: 'white', marginLeft: 5}}>
                  Chia sẻ
                </Text>
              </View>
            </View>
          </Animated.View>
          <PanGestureHandler
            onGestureEvent={panGestureHandler}
            enabled={enable}>
            <Animated.View
              style={[{paddingTop: insets.top + 90}, animatedStyle]}>
              <TouchableOpacity onPress={onImagePress} activeOpacity={1}>
                {/* <PinchGestureHandler
                  onHandlerStateChange={onPinchStateChange}
                  onGestureEvent={onPinchGestureEvent}> */}
                <Animated.Image
                  source={{uri: imageSource}}
                  style={[
                    {
                      width: HEIGHT_IMAGE + 100,
                      height: HEIGHT_IMAGE,
                    },
                    imageStyles,
                    {
                      transform: [{scale: _scale}],
                    },
                  ]}
                  resizeMode={'cover'}
                />
                {/* </PinchGestureHandler> */}
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </View>
    </View>
  );
}
