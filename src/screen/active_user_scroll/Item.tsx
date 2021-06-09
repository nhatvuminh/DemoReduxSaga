import React from 'react';
import { Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { User, USER_ITEM_WIDTH } from './ActiveUserScroll';

type ItemProps = {
  item: User;
  index: number;
  users: Array<User>;
  position: Animated.SharedValue<number>;
};

export default ({ item, index, users, position }: ItemProps) => {
  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        position.value,
        [index - 1, index, index + 1],
        [0.2, 1, 0.2],
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          paddingLeft: index === 0 ? 70 : 25,
          paddingRight: index !== users.length - 1 ? 0 : 70,
        },
        opacityStyles,
      ]}>
      <Image
        source={{ uri: item.avatar }}
        style={{
          borderColor: 'gray',
          borderRadius: 20,
          borderWidth: 1,
          width: USER_ITEM_WIDTH,
          height: 300,
        }}
      />
    </Animated.View>
  );
};
