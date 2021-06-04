import React from 'react';
import {Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Constants from './src/constants/Constants';
import AnimatedScroll from './src/screen/animated_scroll/AnimatedScroll';
import Home from './src/screen/home/Home';
import RootStack from './src/screen/stack/RootStack';
import DragImage from './src/screen/drag_image/DragImage';
import AnimatedScrollView from './src/screen/animated_scroll_view/AnimatedScrollView';

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
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
  DragImage: undefined;
  AnimatedScrollView: undefined;
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
          name={Constants.DRAG_IMAGE}
          component={DragImage}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={Constants.ANIMATED_SCROLL_VIEW}
          component={AnimatedScrollView}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
