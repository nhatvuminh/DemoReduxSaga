import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { NativeModules, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'src/loader/ContentLoader';
import { RootStackParamList } from '../../../App';
import Footballers from '../../Item/Footballers';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

// const resource = fetchProfileData();

export default function Home({ navigation }: HomeProps) {
  const data = useSelector((state: any) => state.footballers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FOOTBALLERS_FETCH_REQUESTED' });
  }, []);

  const Data = () => {
    if (data.message == null) {
      return (
        <View style={{ flex: 1 }}>
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
        </View>
      );
    } else if (data.message != 'success') {
      return (
        <View style={{ flex: 1 }}>
          <Text>{'Error...'}</Text>
        </View>
      );
    }
    return <Footballers footballers={data.footballers} />;

    // return <Footballers footballers={resource.footballers.read()} />;
  };

  const navigationHandler = useCallback(
    (targetScreen: keyof RootStackParamList) => {
      navigation.navigate(targetScreen);
    },
    [navigation],
  );

  const onMoveToAnimatedScroll = () => {
    navigationHandler('AnimatedScroll');
  };

  const onMoveToDragImage = () => {
    navigation.navigate('Navigator', {
      screen: 'ListPost',
    });
  };

  const onMoveToAnimatedScrollView = () => {
    navigationHandler('AnimatedScrollView');
  };

  const onMoveToActiveUserScroll = () => {
    navigationHandler('ActiveUserScroll');
  };

  const onMoveToUberEat = () => {
    navigationHandler('UberEat');
  };

  const onMoveToMomoHeader = () => {
    navigationHandler('Main');
  }

  const onMoveToCircularProgress = () => {
    navigationHandler('CircularProgress');
  }

  const onMoveToCustomViewScreen = () => {
    navigationHandler('CustomViewScreen');
  };
  
  const onBridgeCall = async () => {
    const {ModuleBridge} = NativeModules;
    const x = await ModuleBridge.callFromJS({x: 1, y: 2});
    console.log("aaaaa ===== ", x);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexWrap: 'wrap' }}>
        <TouchableOpacity
          onPress={onMoveToAnimatedScroll}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Animated Scroll</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToDragImage}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Drag Image</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToAnimatedScrollView}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>AnimatedScrollView</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToActiveUserScroll}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>ActiveUserScroll</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToUberEat}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Uber Eat</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToMomoHeader}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Momo Header</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToCircularProgress}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Circular Progress</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onMoveToCustomViewScreen}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>CustomView Screen</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexWrap: 'wrap', marginTop: 20 }}>
        <TouchableOpacity
          onPress={onBridgeCall}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#007bff',
          }}>
          <Text style={{ color: 'white' }}>Bridge call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
