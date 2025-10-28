import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const MontrealStarMainBtn = ({
  selectedPropImg,
  btnTitle,
  onPress,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <ImageBackground source={selectedPropImg} style={styles.montrealstarbtn}>
        <Text style={styles.montrealstarbtntext}>{btnTitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  montrealstarbtn: {
    width: 102,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  montrealstarbtntext: {
    color: '#161616',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default MontrealStarMainBtn;
