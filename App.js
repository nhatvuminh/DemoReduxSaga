import React, {lazy, Suspense, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footballers from './src/Item/Footballers';
import ContentLoader from './src/loader/ContentLoader';
import {fetchProfileData} from './src/saga/request/getFootballers';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';

// const resource = fetchProfileData();

const listImage = [
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRKUBrihFdqXrl2Nvl7YsT7YB5hz6eSNmcKg&usqp=CAU',
    name: 'Mike Socreats',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_HvS_-JGJeHBXcIMxXDitIStV-b6Orcbqqg&usqp=CAU',
    name: 'Ashley Barnes',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1PTHh_VXhbFLLrA6mm5CZpDdc6sIGA43Jw&usqp=CAU',
    name: 'Kola Manser',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglHeFz5vAiihn3fyE1U0L-iRdoCz5fo5sHQ&usqp=CAU',
    name: 'Kurt Schneider',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6GFwgybWjWkHlnC1KzKSpdi_Nb9HXIDdaQ&usqp=CAU',
    name: 'Cristina Contanza',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR93QyYVOzg6_VInn8f9VsoaZ99XhOSeNFg&usqp=CAU',
    name: 'Paul Roger',
  },
];

const App = () => {
  const data = useSelector(state => state.footballers);
  const dispatch = useDispatch();

  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    dispatch({type: 'FOOTBALLERS_FETCH_REQUESTED'});
  }, []);

  const Data = () => {
    if (data.message == null) {
      return (
        <View style={{flex: 1}}>
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
        </View>
      );
    } else if (data.message != 'success') {
      return (
        <View style={{flex: 1}}>
          <Text>{'Error...'}</Text>
        </View>
      );
    }
    return <Footballers footballers={data.footballers} />;

    // return <Footballers footballers={resource.footballers.read()} />;
  };

  const AnimatedScroll = () => {
    const animatedStyles = useAnimatedStyle(() => {
      return {
        padding: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 100],
          [0, 0, 5, 6],
        ),
        paddingLeft: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 100],
          [0, 0, 10, 12],
        ),
        borderTopRightRadius: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 70, 100],
          [10, 10, 15, 25, 25],
        ),
        borderBottomRightRadius: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 70, 100],
          [10, 10, 15, 25, 25],
        ),
        top: interpolate(
          scrollOffset.value,
          [-50, 0, 50, 100],
          [1, 1, 0.5, 0.1],
        ),
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-100, 0, 40, 70, 100],
              [0, 0, 30, 40, 40],
            ),
          },
        ],
        marginLeft: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 50, 60, scrollOffset.value],
          [10, 10, 50, 50, 55, scrollOffset.value - 10],
        ),
        width: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 70, 100],
          [100, 100, 80, 60, 60],
        ),
        height: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 70, 100],
          [150, 150, 100, 60, 60],
        ),
      };
    });

    const animatedStylesAvatar = useAnimatedStyle(() => {
      return {
        borderTopLeftRadius: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [10, 10, 25, 20, 20],
        ),
        borderTopRightRadius: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [10, 10, 25, 20, 20],
        ),
        borderBottomLeftRadius: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [0, 0, 25, 20, 20],
        ),
        borderBottomRightRadius: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [0, 0, 25, 20, 20],
        ),
        width: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [100, 100, 50, 40, 40],
        ),
        height: interpolate(
          scrollOffset.value,
          [-200, 0, 40, 100, 200],
          [100, 100, 50, 40, 40],
        ),
      };
    });

    const animatedStylesView = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: interpolate(
              scrollOffset.value,
              [-200, 0, 40, 100, 200],
              [1, 1, 0.6, 0.5, 0.5],
            ),
          },
          {
            translateX: interpolate(
              scrollOffset.value,
              [-200, 0, 40, 100, 200],
              [0, 0, 10, 20, 20],
            ),
          },
          {
            translateY: interpolate(
              scrollOffset.value,
              [-200, 0, 40, 100, 200],
              [0, 0, -10, -15, -15],
            ),
          },
        ],
      };
    });

    const animatedStylesText = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollOffset.value,
          [-100, 0, 40, 60],
          [1, 1, 0.5, 0],
        ),
      };
    });

    return (
      <Animated.ScrollView
        horizontal
        contentContainerStyle={{paddingVertical: 10}}
        style={{flexGrow: 1}}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}>
        <Animated.View
          style={[
            {
              marginVertical: 10,
              borderRadius: 10,
              width: 100,
              height: '100%',
              position: 'absolute',
              backgroundColor: 'white',
              top: 0,
              bottom: 0,
              left: 0,
              zIndex: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            },
            animatedStyles,
          ]}>
          <Animated.View style={[{alignItems: 'center'}]}>
            <Animated.Image
              source={{uri: listImage[0].avatar}}
              resizeMode={'cover'}
              style={[
                {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
                animatedStylesAvatar,
              ]}
            />
            <Animated.View
              style={[
                {
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#007bff',
                  position: 'absolute',
                  borderColor: 'white',
                  borderWidth: 3,
                  bottom: -18,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                animatedStylesView,
              ]}>
              <Icon name={'plus'} color="white" size={18} />
            </Animated.View>
          </Animated.View>
          <Animated.Text
            style={[
              {
                fontSize: 14,
                color: 'black',
                bottom: 7,
                position: 'absolute',
                fontWeight: '500',
                alignSelf: 'center',
              },
              animatedStylesText,
            ]}>
            {'Tạo tin'}
          </Animated.Text>
        </Animated.View>
        {listImage.map((item, index) => {
          return index === 0 ? null : (
            <Animated.View
              key={index}
              style={{
                width: 100,
                height: 150,
                marginLeft: index === 1 ? 120 : 10,
              }}>
              <Animated.Image
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    top: 5,
                    left: 5,
                    position: 'absolute',
                    borderColor: '#007bff',
                    borderWidth: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 11,
                  },
                ]}
                source={{uri: item.avatar}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  position: 'absolute',
                  bottom: 7,
                  zIndex: 10,
                  paddingHorizontal: 5,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
              <Animated.Image
                key={index}
                source={{uri: item.avatar}}
                resizeMode={'cover'}
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  },
                ]}
              />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{paddingTop: 20}}>
        {/* <Suspense
          fallback={
            <View style={{flex: 1}}>
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
            </View>
          }> */}
        {/* <Data /> */}
        {/* </Suspense> */}
        <AnimatedScroll />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
