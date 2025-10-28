import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useMontrealStarStore = () => {
  return useContext(StoreContext);
};

export const MontrealStarAppContextProvider = ({ children }) => {
  const [isEnabledMontrealStarBgMusic, setIsEnabledMontrealStarBgMusic] =
    useState(false);
  const [isEnabledMontrealStarVibrations, setIsEnabledMontrealStarVibrations] =
    useState(false);
  const [
    isEnabledMontrealStarNotifications,
    setIsEnabledMontrealStarNotifications,
  ] = useState(false);
  const [soundLevel, updateSoundLevel] = useState(1.0);

  // music
  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('volume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error retrieving stored volume data:', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      await AsyncStorage.setItem('volume', `${newLevel}`);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error while storing volume:', err);
    }
  };

  const value = {
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
    setIsEnabledMontrealStarBgMusic,
    isEnabledMontrealStarBgMusic,
    isEnabledMontrealStarNotifications,
    setIsEnabledMontrealStarNotifications,
    isEnabledMontrealStarVibrations,
    setIsEnabledMontrealStarVibrations,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
