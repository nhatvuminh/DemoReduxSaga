import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostItem from '../drag_image/PostItem';
import { posts } from './data';
import { FacebookRoutes, Post } from './Model';

export type ListPostNavigationProp = StackNavigationProp<
  FacebookRoutes,
  'ListPost'
>;

export type ListPostProps = {
  navigation: ListPostNavigationProp;
};

const ListPost = ({}: ListPostProps) => {
  const { top: paddingTop } = useSafeAreaInsets();

  return (
    <ScrollView style={{ paddingTop }}>
      {posts.map((post, index) => {
        return (
          <PostItem
            key={post.post_id}
            post={post}
            index={index}
            isLastIndex={index === posts.length - 1}
          />
        );
      })}
    </ScrollView>
  );
};

export default ListPost;
