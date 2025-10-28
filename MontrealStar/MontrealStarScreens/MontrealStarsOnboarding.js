import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';
import MontrealStarMainBtn from '../MontrealStarComponents/MontrealStarMainBtn';
import React, { use } from 'react';
import { useNavigation } from '@react-navigation/native';

const montrealstaronbdta = [
  {
    montreallbl: 'Welcome to Montreal Star Valuation Night',
    montrealdesc:
      'Step into a sleek world of iconic memorabilia and real auction outcomes.',
    montrealimg: require('../../assets/images/montrealobimg.png'),
    montrealibt: 'Next',
  },
  {
    montreallbl: 'Guess the Price',
    montrealdesc:
      'See an item, pick the price band, and lock your choice before the timer ends.',
    montrealimg: require('../../assets/images/montrealobimg2.png'),
    montrealibt: 'Next',
  },
  {
    montreallbl: 'Learn the Real Value',
    montrealdesc:
      'Reveal authentic sale prices after each round and sharpen your price sense.',
    montrealimg: require('../../assets/images/montrealobimg3.png'),
    montrealibt: 'Next',
  },
  {
    montreallbl: 'Play with Friends',
    montrealdesc:
      '2–6 players, quick rounds, shared laughs, and a glowing leaderboard.',
    montrealimg: require('../../assets/images/montrealobimg4.png'),
    montrealibt: 'Start',
  },
];

const MontrealStarsOnboarding = () => {
  const [currMontrealonbIdx, setCurrMontrealonbIdx] = React.useState(0);
  const montrealstarnav = useNavigation();

  const handleNextMontrealSlidePress = () => {
    if (currMontrealonbIdx < montrealstaronbdta.length - 1) {
      setCurrMontrealonbIdx(currMontrealonbIdx + 1);
    } else {
      montrealstarnav.navigate('MontrealStarsHome');
    }
  };

  return (
    <MontrealStarBackground>
      <View style={styles.montrealstarwr}>
        <Image source={montrealstaronbdta[currMontrealonbIdx].montrealimg} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Image
            source={require('../../assets/images/montrealonbbrd.png')}
            resizeMode="cover"
          />

          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text style={styles.montrealstarlbl}>
              {montrealstaronbdta[currMontrealonbIdx].montreallbl}
            </Text>
            <Text style={styles.montrealstardesc}>
              {montrealstaronbdta[currMontrealonbIdx].montrealdesc}
            </Text>
          </View>
        </View>

        <MontrealStarMainBtn
          selectedPropImg={require('../../assets/images/montrealbtn.png')}
          btnTitle={montrealstaronbdta[currMontrealonbIdx].montrealibt}
          onPress={handleNextMontrealSlidePress}
        />
      </View>
    </MontrealStarBackground>
  );
};

const styles = StyleSheet.create({
  montrealstarwr: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 58,
  },
  montrealstarlbl: {
    color: '#161616',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
    width: 300,
  },
  montrealstardesc: {
    color: '#161616',
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    width: 300,
  },
});

export default MontrealStarsOnboarding;
