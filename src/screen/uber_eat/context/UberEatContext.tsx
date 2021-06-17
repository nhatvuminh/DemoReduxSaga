import React, { Context, useContext } from 'react';
import { RefObject } from 'react';
import Animated from 'react-native-reanimated';
import { KindOfFood } from '../UberEat';

type ContextType = {
  foods: KindOfFood[];
  measurements: number[];
  scrollViewRef: RefObject<Animated.ScrollView> | null;
};

export const UberEatContext = React.createContext<ContextType>({
  foods: [],
  measurements: [],
  scrollViewRef: null,
});
export const useFoods = () => React.useContext(UberEatContext);
