import React from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import { Extrapolate } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Item from './Item';
import MomoHeader, { HEADER_HEIGHT } from './MomoHeader';

export default () => {
  const { top } = useSafeAreaInsets();

  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const translateStyles = useAnimatedStyle(() => ({
    // top: interpolate(
    //   scrollY.value,
    //   [0, HEADER_HEIGHT],
    //   [top + 120, 60],
    //   Extrapolate.CLAMP,
    // ),
    // transform: [
    //   {
    //     translateY: interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, 60]),
    //   },
    // ],
    marginTop: interpolate(
      scrollY.value,
      [-10, 0, HEADER_HEIGHT, HEADER_HEIGHT + 10],
      [120, 120, 60, 60],
    ),
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <MomoHeader offsetY={scrollY} /> */}
      <Animated.ScrollView
        scrollEventThrottle={1}
        stickyHeaderIndices={[0]}
        onScroll={onScrollHandler}
        contentContainerStyle={{ backgroundColor: 'red' }}
        style={[
          {
            flex: 1,
            // ...StyleSheet.absoluteFillObject,
            // top: top + 120,
            // transform: [
            //   {
            //     translateY: top + 120,
            //   },
            // ],
          },
          // translateStyles,
        ]}>
        <MomoHeader offsetY={scrollY} />
        <View>
          <Text>AFGfdsjklfldsjklsnkl</Text>
          <Text>mfjkhdsfhyuiyhcuiha</Text>
          <Text>csachjnhnkadscv</Text>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
            }}
            style={{ width: '100%', height: 200 }}
          />
          <Text>adeowiodsufiadsfdssg</Text>
          <Text>qiowueqiu9ikoplkfdsc</Text>
          <Text>fjhncjklasjfliwoqruow</Text>
          <Text>adschjnkhnjksfdf</Text>
          <Text>fancjhnhfjkehwruei</Text>
          <Text>asdfjjkqifooasjcf</Text>
          <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
          <Text>AAABBB</Text>
          <Text>AAABBBCC</Text>
          <Text>AAASSSS</Text>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
            }}
            style={{ width: '100%', height: 200 }}
          />
          <Text>AFGfdsjklfldsjklsnkl</Text>
          <Text>mfjkhdsfhyuiyhcuiha</Text>
          <Text>csachjnhnkadscv</Text>
          <Text>adeowiodsufiadsfdssg</Text>
          <Text>qiowueqiu9ikoplkfdsc</Text>
          <Text>fjhncjklasjfliwoqruow</Text>
          <Text>adschjnkhnjksfdf</Text>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
            }}
            style={{ width: '100%', height: 200 }}
          />
          <Text>fancjhnhfjkehwruei</Text>
          <Text>asdfjjkqifooasjcf</Text>
          <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
          <Text>AAABBB</Text>
          <Text>AAABBBCC</Text>
          <Text>AAASSSS</Text>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
            }}
            style={{ width: '100%', height: 200 }}
          />
          <Text>fancjhnhfjkehwruei</Text>
          <Text>asdfjjkqifooasjcf</Text>
          <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
          <Text>AAABBB</Text>
          <Text>AAABBBCC</Text>
          <Text>AAASSSS</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
