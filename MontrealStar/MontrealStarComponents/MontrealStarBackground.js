import {
  ImageBackground as MontrealAppImageBackground,
  ScrollView,
} from 'react-native';

const MontrealStarBackground = ({ children }) => {
  return (
    <MontrealAppImageBackground
      source={require('../../assets/images/montrealbg.png')}
      style={{ width: '100%', height: '101%' }}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </MontrealAppImageBackground>
  );
};

export default MontrealStarBackground;
