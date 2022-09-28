import globalStyles from '@globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'src/loader/ContentLoader';
import { RootStackParamList } from '../../../App';
import Footballers from '../../Item/Footballers';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

// const resource = fetchProfileData();

interface Item {
  title: string;
  screen: keyof RootStackParamList;
}

const LIST_SCREEN: Item[] = [
  {
    title: 'Animated Scroll',
    screen: 'AnimatedScroll',
  },
  {
    title: 'Drag Image',
    screen: 'Navigator',
  },
  {
    title: 'AnimatedScrollView',
    screen: 'AnimatedScrollView',
  },
  {
    title: 'ActiveUserScroll',
    screen: 'ActiveUserScroll',
  },
  {
    title: 'Uber Eat',
    screen: 'UberEat',
  },
  {
    title: 'Momo Header',
    screen: 'MomoHeader',
  },
  {
    title: 'Cicular Progress',
    screen: 'CircularProgress',
  },
  {
    title: 'CustomView Screen',
    screen: 'CustomViewScreen',
  },
];

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

  const onNavigateScreen = (screen: keyof RootStackParamList) => {
    navigationHandler(screen);
  };

  const onBridgeCall = async () => {
    const { ModuleBridge } = NativeModules;
    const x = await ModuleBridge.callFromJS({ x: 1, y: 2 });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView contentContainerStyle={[globalStyles.flexGrow, globalStyles.fullFillCenter]}>
        {LIST_SCREEN.map((item, index) => {
          return (
            <View key={index} style={{ flexWrap: 'wrap', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => onNavigateScreen(item.screen)}
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#007bff',
                }}>
                <Text style={{ color: 'white' }}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
