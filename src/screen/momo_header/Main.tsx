import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MomoHeader, { HEADER_HEIGHT } from './MomoHeader';

export default () => {
  const { top, bottom } = useSafeAreaInsets();

  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // const onScrollHandler = event([
  //   {
  //     nativeEvent: {
  //       contentOffset: {
  //         y: scrollY,
  //       },
  //     },
  //   },
  // ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MomoHeader offsetY={scrollY} />
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={onScrollHandler}
        style={StyleSheet.absoluteFill}>
        <View
          style={{ paddingTop: top + HEADER_HEIGHT, paddingBottom: bottom }}>
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
