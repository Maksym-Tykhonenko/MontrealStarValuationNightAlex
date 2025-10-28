import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMontrealStarStore } from '../MontrealStarStore/montrealStarContext';
import Sound from 'react-native-sound';

const MontrealStarsHome = () => {
  const montrealstarnav = useNavigation();
  const { height } = useWindowDimensions();
  const {
    setIsEnabledMontrealStarBgMusic,
    volume,
    isEnabledMontrealStarBgMusic,
    setIsEnabledMontrealStarNotifications,
    setIsEnabledMontrealStarVibrations,
  } = useMontrealStarStore();
  const [montrealStarTrack, setMontrealStarTrack] = useState(0);
  const [sound, setSound] = useState(null);
  const montrealStarTracks = [
    'soft-calm-piano-music-409067.mp3',
    'soft-calm-piano-music-409067.mp3',
  ];

  useEffect(() => {
    playMontrealStarTrack(montrealStarTrack);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [montrealStarTrack]);

  const playMontrealStarTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = montrealStarTracks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error', error);
        return;
      }

      newPartyDareSound.play(success => {
        if (success) {
          setMontrealStarTrack(
            prevIndex => (prevIndex + 1) % montrealStarTracks.length,
          );
        } else {
          console.log('Error ');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadMontrealStarMusic();
      loadMontrealStarVibrations();
      loadMontrealStarNotifications();
    }, []),
  );

  useEffect(() => {
    const setVolumeBasedOnPartydareMusic = async () => {
      try {
        const partyDareMusicValue = await AsyncStorage.getItem(
          'montrealstarmusic',
        );

        const isPartyMusicOn = JSON.parse(partyDareMusicValue);
        setIsEnabledMontrealStarBgMusic(isPartyMusicOn);
        if (sound) {
          sound.setVolume(isPartyMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeBasedOnPartydareMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnabledMontrealStarBgMusic ? volume : 0);
    }
  }, [volume, isEnabledMontrealStarBgMusic]);

  const loadMontrealStarMusic = async () => {
    try {
      const montrealStarMusicValue = await AsyncStorage.getItem(
        'montrealstarmusic',
      );

      const isMontrealStarMusicOn = JSON.parse(montrealStarMusicValue);
      setIsEnabledMontrealStarBgMusic(isMontrealStarMusicOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadMontrealStarNotifications = async () => {
    try {
      const montrealStarNotifValue = await AsyncStorage.getItem(
        'montrealstarnotifications',
      );
      if (montrealStarNotifValue !== null) {
        const isMontrealStarNotOn = JSON.parse(montrealStarNotifValue);
        setIsEnabledMontrealStarNotifications(isMontrealStarNotOn);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadMontrealStarVibrations = async () => {
    try {
      const montrealStarVibroValue = await AsyncStorage.getItem(
        'montrealstarvibro',
      );
      if (montrealStarVibroValue !== null) {
        const isMontrealStarNotOn = JSON.parse(montrealStarVibroValue);

        setIsEnabledMontrealStarVibrations(isMontrealStarNotOn);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <MontrealStarBackground>
      <View style={styles.montrealstarwr}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => montrealstarnav.navigate('MontrealCompanyGameplay')}
        >
          <Image source={require('../../assets/images/montrealbthm.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            montrealstarnav.navigate('MontrealSingleGameplay');
          }}
        >
          <Image source={require('../../assets/images/montrealbthm2.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => montrealstarnav.navigate('MontrealStarRules')}
        >
          <Image source={require('../../assets/images/montrealbthm3.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => montrealstarnav.navigate('MontrealStarSetup')}
        >
          <Image source={require('../../assets/images/montrealbthm4.png')} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/montrealint1.png')}
          style={{ position: 'absolute', top: height * 0.11, left: 0 }}
        />
        <Image
          source={require('../../assets/images/montrealint2.png')}
          style={{ position: 'absolute', top: height * 0.09, left: 150 }}
        />
        <Image
          source={require('../../assets/images/montrealint3.png')}
          style={{ position: 'absolute', top: height * 0.18, right: 0 }}
        />

        <Image
          source={require('../../assets/images/montrealint4.png')}
          style={{ position: 'absolute', bottom: height * 0.12, right: 0 }}
        />
        <Image
          source={require('../../assets/images/montrealint5.png')}
          style={{ position: 'absolute', bottom: 0, right: 90 }}
        />
        <Image
          source={require('../../assets/images/montrealint6.png')}
          style={{ position: 'absolute', bottom: height * 0.13, left: 0 }}
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

export default MontrealStarsHome;
