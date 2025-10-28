import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MontrealStarMainBtn from '../MontrealStarComponents/MontrealStarMainBtn';
import { useMontrealStarStore } from '../MontrealStarStore/montrealStarContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const MontrealStarSetup = () => {
  const montrealstarnav = useNavigation();
  const {
    setIsEnabledMontrealStarBgMusic,
    isEnabledMontrealStarBgMusic,
    isEnabledMontrealStarNotifications,
    setIsEnabledMontrealStarNotifications,
    isEnabledMontrealStarVibrations,
    setIsEnabledMontrealStarVibrations,
  } = useMontrealStarStore();

  const toggleMontrealStarMusic = async value => {
    if (isEnabledMontrealStarNotifications) {
      Toast.show({
        text1: !isEnabledMontrealStarBgMusic
          ? 'Music turned on!'
          : 'Music turned off!',
      });
    }
    try {
      await AsyncStorage.setItem('montrealstarmusic', JSON.stringify(value));
      setIsEnabledMontrealStarBgMusic(value);
    } catch (error) {
      console.log('Error saving music setting:', error);
    }
  };

  const toggleMontrealStarVibration = async value => {
    if (isEnabledMontrealStarNotifications) {
      Toast.show({
        text1: !isEnabledMontrealStarVibrations
          ? 'Vibration turned on!'
          : 'Vibration turned off!',
      });
    }

    try {
      await AsyncStorage.setItem('montrealstarvibro', JSON.stringify(value));
      setIsEnabledMontrealStarVibrations(value);
    } catch (error) {
      console.log('Error saving not setting:', error);
    }
  };

  const toggleMontrealStarNotifications = async value => {
    Toast.show({
      text1: !isEnabledMontrealStarNotifications
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem(
        'montrealstarnotifications',
        JSON.stringify(value),
      );
      setIsEnabledMontrealStarNotifications(value);
    } catch (error) {
      console.log('Error saving not setting:', error);
    }
  };

  return (
    <MontrealStarBackground>
      <View style={styles.montrealstarwr}>
        <ImageBackground
          source={require('../../assets/images/montrealsetbrd.png')}
          style={{ width: 357, height: 312, marginBottom: 14 }}
        >
          <View style={{ padding: 34, paddingBottom: 0 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.montrealstarlbl}>Game Setup</Text>

              {Platform.OS === 'ios' && (
                <View style={styles.montrstarbtnswrp}>
                  <Text style={styles.montrstartxt}>Music</Text>
                  <Pressable
                    onPress={() =>
                      toggleMontrealStarMusic(!isEnabledMontrealStarBgMusic)
                    }
                  >
                    {isEnabledMontrealStarBgMusic ? (
                      <Image
                        source={require('../../assets/images/montrealswton.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/montrealswtoff.png')}
                      />
                    )}
                  </Pressable>
                </View>
              )}

              <View style={styles.montrstarbtnswrp}>
                <Text style={styles.montrstartxt}>Vibration</Text>
                <Pressable
                  onPress={() =>
                    toggleMontrealStarVibration(
                      !isEnabledMontrealStarVibrations,
                    )
                  }
                >
                  {isEnabledMontrealStarVibrations ? (
                    <Image
                      source={require('../../assets/images/montrealswton.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/montrealswtoff.png')}
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.montrstarbtnswrp}>
                <Text style={styles.montrstartxt}>Notifications</Text>
                <Pressable
                  onPress={() =>
                    toggleMontrealStarNotifications(
                      !isEnabledMontrealStarNotifications,
                    )
                  }
                >
                  {isEnabledMontrealStarNotifications ? (
                    <Image
                      source={require('../../assets/images/montrealswton.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/montrealswtoff.png')}
                    />
                  )}
                </Pressable>
              </View>

              {Platform.OS === 'ios' && (
                <View style={styles.montrstarbtnswrp}>
                  <Text style={styles.montrstartxt}>Share App</Text>
                  <Pressable
                    onPress={() =>
                      Linking.openURL(
                        'https://apps.apple.com/us/app/montreal-star-valuation-night/id6753670016',
                      )
                    }
                  >
                    <Image
                      source={require('../../assets/images/montrealshr.png')}
                    />
                  </Pressable>
                </View>
              )}
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
    marginBottom: 45,
    textAlign: 'center',
  },
  montrealstardesc: {
    color: '#161616',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  montrstarbtnswrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  montrstartxt: {
    color: '#161616',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default MontrealStarSetup;
