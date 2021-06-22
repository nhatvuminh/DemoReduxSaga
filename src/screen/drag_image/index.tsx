import React from 'react';
import Constants from '../../constants/Constants';
import ListPost from './ListPost';
import DetailPost from './DetailPost';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { FacebookRoutes } from './Model';

const Stack = createSharedElementStackNavigator<FacebookRoutes>();
const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: 'transparent' },
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: { opacity: progress },
      }),
    }}
    headerMode={'none'}
    mode={'modal'}>
    <Stack.Screen
      name={'ListPost'}
      component={ListPost}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen
      name={'DetailPost'}
      component={DetailPost}
      options={{
        gestureEnabled: false,
      }}
      sharedElements={route => {
        const { post_id } = route.params.post;
        return [`${post_id}`];
      }}
    />
  </Stack.Navigator>
);

export default Navigator;
