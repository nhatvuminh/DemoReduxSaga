import React from 'react';
import { Text, View, Image } from 'react-native';
import { Footballer } from '../saga/request/getFootballers';

type FootballersProps = {
  footballers: Array<Footballer>;
};

export default function Footballers({ footballers }: FootballersProps) {
  const CardLevel = ({ cardLevel }: { cardLevel: number }) => {
    switch (cardLevel) {
      case 7:
        return <Image source={require('../assets/grade7.png')} />;
      case 8:
        return <Image source={require('../assets/grade8.png')} />;
      default:
        return <Image source={require('../assets/grade7.png')} />;
    }
  };

  const Avatar = ({ avatar }: { avatar: string }) => {
    return (
      <Image
        source={{ uri: avatar }}
        resizeMode={'cover'}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    );
  };

  return (
    <View>
      {footballers.map(footballer => {
        return (
          <View
            key={footballer.id}
            style={{
              marginBottom: 10,
              backgroundColor: 'white',
              paddingHorizontal: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar avatar={footballer.avatar} />
              <Text style={{ fontSize: 15, marginLeft: 10 }}>
                {footballer.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  {footballer.OVR}
                </Text>
                <CardLevel cardLevel={footballer.cardLevel} />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
