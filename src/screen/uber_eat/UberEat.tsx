import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  LayoutChangeEvent,
  StatusBarStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderImage from './HeaderImage';
import { UberEatContext } from './context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Food = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export type KindOfFood = {
  title: string;
  list_food: Food[];
};

type UberEatProps = {
  foods: KindOfFood[];
};

const { width } = Dimensions.get('window');
export const IMAGE_HEADER_HEIGHT = width / (480 / 320);
export const ICON_BACK_SIZE = 30;

export default ({
  foods = [
    {
      title: 'Starters',
      list_food: [
        {
          id: 1,
          name: 'Brie and caramelised pear tart',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '10$',
        },
        {
          id: 2,
          name: 'Baked spring rolls',
          description:
            '24 Sushi bites Sushi is my favorite food and watercolor my favorite medium. Perfect Combo. You can get quality prints of this piece on my Society6 Store. Free Shipping until November 17, 2013 using this PROMO LINK Please share :)',
          price: '10$',
        },
        {
          id: 3,
          name: 'Roasted stuffed mushrooms',
          description:
            'Find the perfect handmade gift, vintage & on-trend clothes, unique jewelry, and more… lots more.',
          price: '10$',
        },
      ],
    },
    {
      title: 'Expensive Food',
      list_food: [
        {
          id: 1,
          name: 'Korean Kimbap',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '50$',
        },
        {
          id: 2,
          name: 'King Crab',
          description: 'A food of Canada',
          price: '100$',
        },
        {
          id: 3,
          name: 'Spring Fish',
          description:
            'Jun 28, 2019 - Sea Animals in English! Learn the useful list of the names of sea animals in English with example sentences and ESL printable infographic.',
          price: '120$',
        },
      ],
    },
    {
      title: 'Cheap Food',
      list_food: [
        {
          id: 1,
          name: 'Korean Kimbap',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '5$',
        },
        {
          id: 2,
          name: 'King Crab',
          description:
            'Jun 28, 2019 - Sea Animals in English! Learn the useful list of the names of sea animals in English with example sentences and ESL printable infographic.',
          price: '20$',
        },
        {
          id: 3,
          name: 'King Crab',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '10$',
        },
        {
          id: 4,
          name: 'King Crab',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '10$',
        },
      ],
    },
    {
      title: 'Other Food',
      list_food: [
        {
          id: 1,
          name: 'Korean Kimbap',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '5$',
        },
        {
          id: 2,
          name: 'King Crab',
          description:
            'Jun 28, 2019 - Sea Animals in English! Learn the useful list of the names of sea animals in English with example sentences and ESL printable infographic.',
          price: '20$',
        },
        {
          id: 3,
          name: 'King Crab',
          description:
            'What’s in a roll? Maki, short for makizushi, means “rolled sushi” and includes Sake, Uni, Ikura, Tekka, Futomaki, California, among others. Nigiri means “hand-pressed sushi” and includes Anago, Ebi, Hamachi, Maguro, Saba, and Tamago, among others. This hand-drawn array of sushi includes names and some main ingredients, so you don’t just seafood. This print is a 9"x12" digital reproduction of an original watercolor + pen and ink illustration. It is printed on 100lb EcoSilk Paper with… ',
          price: '10$',
        },
      ],
    },
  ],
}: UberEatProps) => {
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(foods.length).fill(0),
  );

  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');

  const scrollY = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
      if (scrollY.value >= IMAGE_HEADER_HEIGHT + 70) {
        runOnJS(setBarStyle)('dark-content');
      } else {
        runOnJS(setBarStyle)('light-content');
      }
    },
  });

  const infoStyles = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, IMAGE_HEADER_HEIGHT - 100], [1, 0]),
  }));

  const onLayout = (e: LayoutChangeEvent, i: number) => {
    measurements[i] = e.nativeEvent.layout.y + IMAGE_HEADER_HEIGHT + 70;
    setMeasurements([...measurements]);
  };

  return (
    <UberEatContext.Provider value={{ foods: foods, measurements }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle={barStyle} />
        <HeaderImage y={scrollY} />
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={onScrollHandler}
          style={{ ...StyleSheet.absoluteFillObject }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingBottom: 15,
              paddingTop: IMAGE_HEADER_HEIGHT + 40,
            }}>
            <Animated.View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                infoStyles,
              ]}>
              <Text style={{ fontSize: 14, fontWeight: '500' }}>
                Open at 16:00 PM - 22:00 PM
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={'star'} size={22} color={'#ffce0c'} />
                <Text style={{ marginLeft: 5 }}>(186)</Text>
              </View>
            </Animated.View>
            <View
              style={{
                height: 1,
                marginVertical: 20,
                backgroundColor: 'black',
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              Restaurant Info
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              {
                "15 Mac Thi Buoi Street, Cau Giay District, Ha Noi, Viet Nam.\nHas 15 years experience for cooking Korean's food."
              }
            </Text>
            <View>
              {foods.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginTop: 20 }}
                    onLayout={e => onLayout(e, index)}>
                    <View
                      style={{
                        height: 1,
                        marginVertical: 10,
                        backgroundColor: 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 22,
                        marginBottom: 10,
                      }}>
                      {item.title}
                    </Text>

                    {item.list_food.map((food, _) => {
                      return (
                        <View key={food.id} style={{ marginTop: 10 }}>
                          <Text style={{ fontWeight: '500', fontSize: 16 }}>
                            {food.name}
                          </Text>
                          <Text style={{ color: 'gray', marginTop: 5 }}>
                            {food.description}
                          </Text>
                          <Text style={{ marginTop: 8 }}>{food.price}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </Animated.ScrollView>
        <Header y={scrollY} />
      </View>
    </UberEatContext.Provider>
  );
};
