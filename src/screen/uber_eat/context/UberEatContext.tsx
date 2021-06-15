import React, { Context, useContext } from 'react';
import { KindOfFood } from '../UberEat';

type ContextType = {
  foods: KindOfFood[];
  measurements: number[];
};

export const UberEatContext = React.createContext<ContextType>({
  foods: [],
  measurements: [],
});
export const useFoods = () => React.useContext(UberEatContext);
