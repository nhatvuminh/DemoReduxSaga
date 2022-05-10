import AccountManagerment from '@momoHeader/accountManagerment';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_HEADER_HEIGHT } from './Item';
import MomoHeader from './MomoHeader';

export default () => {
  const { top, bottom } = useSafeAreaInsets();

  const offsetY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      offsetY.value = e.contentOffset.y;
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MomoHeader offsetY={offsetY} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScrollHandler}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={StyleSheet.absoluteFill}
        >
        <AccountManagerment offsetY={offsetY} />
        <Text>mfjkhdsfhyuiyhcuiha</Text>
        <Text>csachjnhnkadscv</Text>
        <Text>adeowiodsufiadsfdssg</Text>
        <Text>qiowueqiu9ikoplkfdsc</Text>
        <Text>fjhncjklasjfliwoqruow</Text>
        <Text>adschjnkhnjksfdf</Text>
        <Text>fancjhnhfjkehwruei</Text>
        <Text>asdfjjkqifooasjcf</Text>
        <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
        <Text>AAABBB</Text>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
          }}
          style={{ width: '100%', height: 200 }}
        />
        <Text>AAABBBCC</Text>
        <Text>AAASSSS</Text>
        <Text>AFGfdsjklfldsjklsnkl</Text>
        <Text>mfjkhdsfhyuiyhcuiha</Text>
        <Text>csachjnhnkadscv</Text>
        <Text>adeowiodsufiadsfdssg</Text>
        <Text>qiowueqiu9ikoplkfdsc</Text>
        <Text>fjhncjklasjfliwoqruow</Text>
        <Text>adschjnkhnjksfdf</Text>
        <Text>fancjhnhfjkehwruei</Text>
        <Text>asdfjjkqifooasjcf</Text>
        <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
          }}
          style={{ width: '100%', height: 200 }}
        />
        <Text>AAABBB</Text>
        <Text>AAABBBCC</Text>
        <Text>AAASSSS</Text>
        <Text>fancjhnhfjkehwruei</Text>
        <Text>asdfjjkqifooasjcf</Text>
        <Text>fdsjhjqurueiofhyoyyg9y8efdf</Text>
        <Text>AAABBB</Text>
        <Text>AAABBBCC</Text>
        <Text>AAASSSS</Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
