import React from 'react';
import {Text, View, Image} from 'react-native';

export default function Footballers({footballers}) {
  const CardLevel = ({cardLevel}) => {
    switch (cardLevel) {
      case 7:
        return <Image source={require('../assets/grade7.png')} />;
      case 8:
        return <Image source={require('../assets/grade8.png')} />;
      default:
        return <Image source={require('../assets/grade7.png')} />;
    }
  };

  const Avatar = ({avatar}) => {
    return (
      <Image
        source={{uri: avatar}}
        resizeMode={'cover'}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
    );
  };

  return footballers.map(footballer => (
    <View
      key={footballer.id}
      style={{
        marginBottom: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar avatar={footballer.avatar} />
        <Text style={{fontSize: 15, marginLeft: 10}}>{footballer.name}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {footballer.OVR}
          </Text>
          <CardLevel cardLevel={footballer.cardLevel} />
        </View>
      </View>
    </View>
  ));
}
