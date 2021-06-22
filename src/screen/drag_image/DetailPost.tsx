import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SharedElement } from 'react-navigation-shared-element';
import { FacebookRoutes } from './Model';

interface DetailProps {
  navigation: NavigationProp<FacebookRoutes, 'DetailPost'>;
  route: RouteProp<FacebookRoutes, 'DetailPost'>;
}

const DetailPost = ({ navigation, route }: DetailProps) => {
  const { width: widthScreen, height: heightScreen } = useWindowDimensions();
  const { post, height } = route.params;
  const { top, bottom } = useSafeAreaInsets();
  const opacity = useSharedValue(1);
  const transX = useSharedValue(0);
  const transY = useSharedValue(0);

  const close = () => {
    navigation.goBack();
  };

  const abs = (number: number): number => {
    'worklet';
    return Math.abs(number);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: Record<string, number>) => {
      ctx.startX = transX.value;
      ctx.startY = transY.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX !== ctx.startX && abs(event.translationY) > 20) {
        transX.value = ctx.startX + event.translationX;
        transY.value = ctx.startY + event.translationY;
        opacity.value = 0;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationX !== ctx.startX && abs(event.translationY) > 150) {
        runOnJS(navigation.goBack)();
        opacity.value = 0;
      } else {
        transX.value = withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.quad),
        });
        transY.value = withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.quad),
        });
        opacity.value = withTiming(1, { duration: 300 });
      }
    },
  });

  const imageStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: transX.value }, { translateY: transY.value }],
  }));

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      transY.value,
      [-heightScreen / 4, 0, heightScreen / 4],
      [0.5, 1, 0.5],
    ),
  }));

  const opacityStyles1 = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const opacityStyles2 = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
        },
      ]}>
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
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            left: 12,
            top: top + 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
            backgroundColor: 'white',
            zIndex: 1,
          },
          opacityStyles1,
        ]}>
        <TouchableOpacity onPress={close}>
          <FeatherIcon name={'x'} color={'black'} size={20} />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[{ flex: 1 }, imageStyles]}>
          <SharedElement
            id={`${post.post_id}`}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: post.post_image }}
              style={[
                {
                  width: '100%',
                  height: height,
                },
              ]}
              resizeMode={'cover'}
            />
          </SharedElement>
        </Animated.View>
      </PanGestureHandler>
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
            paddingBottom: bottom + 10,
          },
          opacityStyles2,
        ]}>
        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
          {post.username}
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
          {post.description}
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
};

export default DetailPost;
