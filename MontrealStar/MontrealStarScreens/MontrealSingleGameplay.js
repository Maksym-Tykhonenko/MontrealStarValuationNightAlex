import React, { useState } from 'react';
import {
  View as MontrealStarView,
  Text as MontrealStarText,
  TouchableOpacity as MontrealStarTouchableOpacity,
  StyleSheet as MontrealStarStyleSheet,
  Image as MontrealStarImage,
  ImageBackground as MontrealStarImageBackground,
  Modal as MontrealStarModal,
  Vibration,
  Platform,
} from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';
import MontrealStarMainBtn from '../MontrealStarComponents/MontrealStarMainBtn';
import { useNavigation as useMontrealStarNavigation } from '@react-navigation/native';
import { montrealStarQuestions } from '../MontrealStarComponents/montrealStarQuestions';
import { useMontrealStarStore } from '../MontrealStarStore/montrealStarContext';
import { BlurView } from '@react-native-community/blur';

export default function MontrealStarSinglePlayer() {
  const [montrealStarStep, setMontrealStarStep] = useState('welcome');
  const [montrealStarCurrentQuestion, setMontrealStarCurrentQuestion] =
    useState(0);
  const [montrealStarScore, setMontrealStarScore] = useState(0);
  const [montrealStarSelectedOption, setMontrealStarSelectedOption] =
    useState(null);
  const [montrealStarAnswerStatus, setMontrealStarAnswerStatus] =
    useState(null);
  const [montrealStarResults, setMontrealStarResults] = useState([]);
  const [montrealStarModalVisible, setMontrealStarModalVisible] =
    useState(false);
  const montrealStarNav = useMontrealStarNavigation();
  const { isEnabledMontrealStarVibrations } = useMontrealStarStore();

  const montrealStarQ = montrealStarQuestions[montrealStarCurrentQuestion];

  const handleMontrealStarAnswer = optionIdx => {
    if (montrealStarSelectedOption !== null) return;
    setMontrealStarSelectedOption(optionIdx);
    const num = montrealStarQ.montrealStarOptions[optionIdx];
    let status = 'wrong',
      addScore = 0;
    if (num === montrealStarQ.montrealStarAnswer) {
      status = 'correct';
      addScore = 5;
    } else if (montrealStarQ.montrealStarCloseAnswers.includes(num)) {
      status = 'close';
      addScore = 2;
    }
    setMontrealStarAnswerStatus(status);
    setMontrealStarScore(s => s + addScore);

    setMontrealStarResults(results => [
      ...results,
      { question: montrealStarQ.montrealStarQuestion, score: addScore },
    ]);
  };

  const handleMontrealStarNext = () => {
    setMontrealStarSelectedOption(null);
    setMontrealStarAnswerStatus(null);
    if (montrealStarCurrentQuestion + 1 < montrealStarQuestions.length) {
      setMontrealStarCurrentQuestion(montrealStarCurrentQuestion + 1);
    } else {
      setMontrealStarStep('finalResults');
    }
  };

  const handleHomePress = () => setMontrealStarModalVisible(true);

  const handleModalCancel = () => setMontrealStarModalVisible(false);

  const handleModalConfirm = () => {
    setMontrealStarModalVisible(false);
    montrealStarNav.goBack('');
  };

  const renderMontrealStarWelcome = () => (
    <MontrealStarBackground>
      <MontrealStarView
        style={[montrealStarStyles.container, { alignItems: 'center' }]}
      >
        <MontrealStarImage
          source={require('../../assets/images/montrealgm1.png')}
        />
        <MontrealStarImageBackground
          source={require('../../assets/images/montrealgmbrd1.png')}
          style={{
            width: 334,
            height: 348,
            padding: 48,
            paddingHorizontal: 40,
          }}
        >
          <MontrealStarText style={montrealStarStyles.sanremowlcttl}>
            Welcome to the Auction Price Quiz!
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcsbttl, { marginBottom: 20 }]}
          >
            Guess real auction prices to earn points for accuracy.
          </MontrealStarText>
          <MontrealStarText style={montrealStarStyles.sanremowlcsbttl}>
            Try to get the highest score!
          </MontrealStarText>
        </MontrealStarImageBackground>
        <MontrealStarView
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Menu"
            onPress={() => montrealStarNav.goBack('')}
          />
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Start"
            onPress={() => setMontrealStarStep('game')}
          />
        </MontrealStarView>
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const renderMontrealStarGame = () => (
    <MontrealStarBackground>
      <MontrealStarView
        style={[montrealStarStyles.container, { alignItems: 'center' }]}
      >
        <MontrealStarImageBackground
          source={require('../../assets/images/montrealgminpbrd.png')}
          style={{
            width: 346,
            height: 562,
            padding: 10,
            paddingHorizontal: 14,
            marginBottom: 20,
          }}
        >
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttl, { marginBottom: 8 }]}
          >
            Round 1
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttlitl, { marginBottom: 6 }]}
          >
            {montrealStarQ.montrealStarQuestion}
          </MontrealStarText>
          <MontrealStarImage
            source={montrealStarQ.montrealStarImage}
            style={{
              borderRadius: 12,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 30,
              width: 170,
              height: 170,
            }}
          />
          {montrealStarSelectedOption !== null ? (
            <MontrealStarText
              style={[
                montrealStarStyles.sanremofacttxt,
                { marginBottom: 10, minHeight: 40 },
              ]}
            >
              {montrealStarQ.montrealStarFact}
            </MontrealStarText>
          ) : (
            <MontrealStarText
              style={[
                montrealStarStyles.sanremowlcttlitl,
                { marginBottom: 10, minHeight: 40 },
              ]}
            >
              Choose the correct price band!
            </MontrealStarText>
          )}
          <MontrealStarView style={montrealStarStyles.optionsRow}>
            {montrealStarQ.montrealStarOptions.map((option, oidx) => {
              let imgSrc = require('../../assets/images/montrealopt.png');
              if (
                montrealStarSelectedOption !== null &&
                oidx === montrealStarSelectedOption
              ) {
                if (montrealStarAnswerStatus === 'correct')
                  imgSrc = require('../../assets/images/montrealoptgd.png');
                else if (montrealStarAnswerStatus === 'close')
                  imgSrc = require('../../assets/images/montrealoptcom.png');
                else {
                  if (isEnabledMontrealStarVibrations) {
                    Vibration.vibrate(300);
                  }
                  imgSrc = require('../../assets/images/montrealoptwr.png');
                }
              }
              return (
                <MontrealStarTouchableOpacity
                  key={oidx}
                  style={[
                    montrealStarStyles.optionBtn,
                    { backgroundColor: 'transparent' },
                  ]}
                  disabled={montrealStarSelectedOption !== null}
                  onPress={() => handleMontrealStarAnswer(oidx)}
                >
                  <MontrealStarImageBackground
                    source={imgSrc}
                    style={{
                      width: 102,
                      height: 43,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MontrealStarText style={montrealStarStyles.optionText}>
                      ${option}M
                    </MontrealStarText>
                  </MontrealStarImageBackground>
                </MontrealStarTouchableOpacity>
              );
            })}
          </MontrealStarView>
        </MontrealStarImageBackground>
        <MontrealStarView
          style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}
        >
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Menu"
            onPress={handleHomePress}
          />
          <MontrealStarMainBtn
            selectedPropImg={
              montrealStarSelectedOption === null
                ? require('../../assets/images/montrealdisbtn.png')
                : require('../../assets/images/montrealbtn.png')
            }
            btnTitle={
              montrealStarCurrentQuestion + 1 === montrealStarQuestions.length
                ? 'Finish'
                : 'Next'
            }
            onPress={handleMontrealStarNext}
            isDisabled={montrealStarSelectedOption === null}
          />
        </MontrealStarView>
        <MontrealStarModal
          transparent
          visible={montrealStarModalVisible}
          animationType="fade"
          statusBarTranslucent={Platform.OS === 'android'}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={MontrealStarStyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={2}
            />
          )}
          <MontrealStarView style={montrealStarStyles.modalOverlay}>
            <MontrealStarView style={montrealStarStyles.modalContent}>
              <MontrealStarImageBackground
                source={require('../../assets/images/montrealgwinbrd.png')}
                style={{
                  width: 362,
                  height: 223,
                  padding: 30,
                  paddingHorizontal: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MontrealStarText style={montrealStarStyles.modalText}>
                  Are you really want to interrupt the Game?
                </MontrealStarText>
                <MontrealStarText style={montrealStarStyles.modalTextSbt}>
                  Current progress will be lost.
                </MontrealStarText>
                <MontrealStarView
                  style={{ flexDirection: 'row', gap: 18, marginTop: 18 }}
                >
                  <MontrealStarMainBtn
                    selectedPropImg={require('../../assets/images/montrealoptwr.png')}
                    btnTitle="Yes"
                    onPress={handleModalConfirm}
                  />
                  <MontrealStarMainBtn
                    selectedPropImg={require('../../assets/images/montrealoptgd.png')}
                    btnTitle="No"
                    onPress={handleModalCancel}
                  />
                </MontrealStarView>
              </MontrealStarImageBackground>
            </MontrealStarView>
          </MontrealStarView>
        </MontrealStarModal>
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const renderMontrealStarFinalResults = () => (
    <MontrealStarBackground>
      <MontrealStarView
        style={[montrealStarStyles.container, { alignItems: 'center' }]}
      >
        <MontrealStarImage
          source={require('../../assets/images/montrealgm3.png')}
        />
        <MontrealStarImageBackground
          source={require('../../assets/images/montrealgwinbrd.png')}
          style={{
            width: 362,
            height: 223,
            padding: 12,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <MontrealStarImage
            source={require('../../assets/anim/montrealanimwinsl.gif')}
            style={{
              width: 280,
              height: 280,
              position: 'absolute',
              top: -100,
              left: 35,
            }}
          />
          <MontrealStarText style={montrealStarStyles.sanremowlcttl}>
            The Game is Over
          </MontrealStarText>
          <MontrealStarText
            style={{
              fontSize: 18,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Your Final result: {montrealStarScore}
          </MontrealStarText>
          <MontrealStarText
            style={{
              marginTop: 17,
              fontSize: 17,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Great score! Keep training to set a new personal best.
          </MontrealStarText>
        </MontrealStarImageBackground>
        <MontrealStarView
          style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}
        >
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Menu"
            onPress={() => montrealStarNav.goBack('')}
          />
        </MontrealStarView>
      </MontrealStarView>
    </MontrealStarBackground>
  );

  if (montrealStarStep === 'welcome') return renderMontrealStarWelcome();
  if (montrealStarStep === 'game') return renderMontrealStarGame();
  if (montrealStarStep === 'finalResults')
    return renderMontrealStarFinalResults();
  return null;
}

const montrealStarStyles = MontrealStarStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sanremowlcttl: {
    color: '#161616',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 35,
    textAlign: 'center',
  },
  sanremowlcsbttl: {
    color: '#161616',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  sanremowlcttlitl: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  sanremorestxt: {
    color: '#161616',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  sanremofacttxt: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  resultsRow: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  resultsCell: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  optionText: { fontWeight: 'bold', fontSize: 18 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    color: '#161616',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalTextSbt: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});
