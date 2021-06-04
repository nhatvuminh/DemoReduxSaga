import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  event,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {RootStackParamList} from '../../../App';

type AnimatedScrollViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimatedScrollView'
>;

type AnimatedScrollViewProps = {
  navigation: AnimatedScrollViewNavigationProp;
};

export default function AnimatedScrollView({
  navigation,
}: AnimatedScrollViewProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 199, 199.5, 200], [1, 1, 0, 0]),
    };
  });

  const topViewStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 199, 199.5, 200], [0, 0, 1, 1]),
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        style={{flexGrow: 1}}
        onScroll={scrollHandler}>
        <Animated.View
          style={[
            {
              marginTop: 200,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'black',
              flexDirection: 'row',
              backgroundColor: '#007bff',
            },
            styles,
          ]}>
          {Array(3)
            .fill(3)
            .map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1 / 3,
                    padding: 10,
                    borderColor: 'black',
                    borderRightWidth: index < 2 ? 1 : 0,
                    flexWrap: 'wrap',
                  }}>
                  <Text style={{fontSize: 14, color: 'white'}}>{index}</Text>
                </View>
              );
            })}
        </Animated.View>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
        <Text>AADSDUAOIDAIOSUDJUDIOSDIOASJDIOAJSDI</Text>
      </Animated.ScrollView>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'black',
            flexDirection: 'row',
            backgroundColor: '#007bff',
          },
          topViewStyles,
        ]}>
        {Array(3)
          .fill(3)
          .map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1 / 3,
                  padding: 10,
                  borderColor: 'black',
                  borderRightWidth: index < 2 ? 1 : 0,
                  flexWrap: 'wrap',
                }}>
                <Text style={{fontSize: 14, color: 'white'}}>{index}</Text>
              </View>
            );
          })}
      </Animated.View>
    </SafeAreaView>
  );
}
