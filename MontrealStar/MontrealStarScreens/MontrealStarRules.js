import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MontrealStarMainBtn from '../MontrealStarComponents/MontrealStarMainBtn';

const MontrealStarRules = () => {
  const montrealstarnav = useNavigation();

  return (
    <MontrealStarBackground>
      <View style={styles.montrealstarwr}>
        <ImageBackground
          source={require('../../assets/images/montrealrlsbrd.png')}
          style={{ width: 373, height: 606, marginBottom: 14 }}
        >
          <View style={{ padding: 25 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.montrealstarlbl}>Game Rules</Text>
              <Text
                style={styles.montrealstardesc}
              >{`Montreal Star Valuation Night — How to Play
You’ll see a real celebrity memorabilia lot: a photo and a short description. Your job is to guess the price band at which it actually sold at auction. Pick one of the five bands before the timer ends. When time’s up, the game reveals the real price and the correct band, then awards points. The player with the highest total after all rounds wins.
Play solo (to sharpen your pricing sense) or with 2–6 players. In party play, one person hosts a room and others join with a code. Choose the number of rounds at the start (e.g., 5, 10, or 20). Each round runs on a short timer—you must lock in your band in time.
Five price bands:
$1–2M
$2–3M
$3–5M
$5–10M
$10–30M
Bands are lower-inclusive and upper-exclusive (e.g., $3.00M–$4.999M falls under $3–5M). The top band includes $30M.
Scoring (simple and clear):
Exact band — 5 points
Adjacent band (one step away) — 2 points
All others — 0 points
Example: If the real price is $4.2M, the correct band is $3–5M. Anyone who chose $3–5M gets 5 points; $2–3M or $5–10M earns 2 points; all other picks get 0.
Play through the selected number of rounds, add up the points, and that’s the winner. No bonuses, no hints—just pure intuition and real-world auction knowledge. Enjoy!`}</Text>
            </ScrollView>
          </View>
        </ImageBackground>

        <MontrealStarMainBtn
          selectedPropImg={require('../../assets/images/montrealbtn.png')}
          btnTitle="Menu"
          onPress={() => montrealstarnav.goBack('')}
        />
      </View>
    </MontrealStarBackground>
  );
};

const styles = StyleSheet.create({
  montrealstarwr: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 20,
    paddingBottom: 40,
  },
  montrealstarlbl: {
    color: '#161616',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  montrealstardesc: {
    color: '#161616',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default MontrealStarRules;
