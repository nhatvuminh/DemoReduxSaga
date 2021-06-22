import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import Constants from './src/constants/Constants';
import AnimatedScroll from './src/screen/animated_scroll/AnimatedScroll';
import Home from './src/screen/home/Home';
import RootStack from './src/screen/stack/RootStack';
import ListPost from './src/screen/drag_image/ListPost';
import AnimatedScrollView from './src/screen/animated_scroll_view/AnimatedScrollView';
import ActiveUserScroll from './src/screen/active_user_scroll/ActiveUserScroll';
import UberEat from './src/screen/uber_eat/UberEat';
import Navigator from './src/screen/drag_image';
import { FacebookRoutes } from './src/screen/drag_image/Model';

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

((Text as unknown) as TextWithDefaultProps).defaultProps =
  ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

((TextInput as unknown) as TextWithDefaultProps).defaultProps =
  ((TextInput as unknown) as TextWithDefaultProps).defaultProps || {};
((TextInput as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

export type RootStackParamList = {
  Home: undefined;
  AnimatedScroll: undefined;
  Navigator: NavigatorScreenParams<FacebookRoutes>;
  AnimatedScrollView: undefined;
  ActiveUserScroll: undefined;
  UberEat: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={Constants.HOME} component={Home} />
        <RootStack.Screen
          name={Constants.ANIMATED_SCROLL}
          component={AnimatedScroll}
        />
        <RootStack.Screen
          name={Constants.NAVIGATOR}
          component={Navigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={Constants.ANIMATED_SCROLL_VIEW}
          component={AnimatedScrollView}
        />
        <RootStack.Screen
          name={Constants.SCROLL_ACTIVE_USER}
          component={ActiveUserScroll}
        />
        <RootStack.Screen
          name={Constants.UBER_EAT}
          component={UberEat}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
