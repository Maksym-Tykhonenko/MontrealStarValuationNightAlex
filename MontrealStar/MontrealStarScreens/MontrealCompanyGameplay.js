import React, { useState } from 'react';
import {
  View as MontrealStarView,
  Text as MontrealStarText,
  TextInput as MontrealStarTextInput,
  TouchableOpacity as MontrealStarTouchableOpacity,
  StyleSheet as MontrealStarStyleSheet,
  Image as MontrealStarImage,
  ImageBackground as MontrealStarImageBackground,
  Modal as MontrealStarModal,
  Vibration,
  Platform,
  ScrollView,
} from 'react-native';
import MontrealStarBackground from '../MontrealStarComponents/MontrealStarBackground';
import MontrealStarMainBtn from '../MontrealStarComponents/MontrealStarMainBtn';
import { useNavigation as useMontrealStarNavigation } from '@react-navigation/native';
import { montrealStarQuestions } from '../MontrealStarComponents/montrealStarQuestions';
import { useMontrealStarStore } from '../MontrealStarStore/montrealStarContext';
import { BlurView } from '@react-native-community/blur';

const montrealStarRoundsOptions = [5, 10, 20];

export default function MontrealCompanyGameplay() {
  const [montrealStarStep, setMontrealStarStep] = useState('welcome');
  const [montrealStarNumPlayers, setMontrealStarNumPlayers] = useState(2);
  const [montrealStarNumRounds, setMontrealStarNumRounds] = useState(5);
  const montrealStarNav = useMontrealStarNavigation();
  const [montrealStarNames, setMontrealStarNames] = useState(['', '']);
  const [montrealStarNamesErrors, setMontrealStarNamesErrors] = useState([
    false,
    false,
  ]);
  const [montrealStarCurrentRound, setMontrealStarCurrentRound] = useState(1);
  const [montrealStarCurrentPlayer, setMontrealStarCurrentPlayer] = useState(0);
  const [montrealStarScores, setMontrealStarScores] = useState(
    Array(6).fill(0),
  );
  const [montrealStarSelectedOption, setMontrealStarSelectedOption] =
    useState(null);
  const [montrealStarAnswerStatus, setMontrealStarAnswerStatus] =
    useState(null);
  const [montrealStarRoundScores, setMontrealStarRoundScores] = useState([]);
  const [montrealStarAllRoundScores, setMontrealStarAllRoundScores] = useState(
    [],
  );
  const [montrealStarModalVisible, setMontrealStarModalVisible] =
    useState(false);
  const handleHomePress = () => setMontrealStarModalVisible(true);
  const handleModalCancel = () => setMontrealStarModalVisible(false);
  const { isEnabledMontrealStarVibrations } = useMontrealStarStore();
  const handleModalConfirm = () => {
    setMontrealStarModalVisible(false);
    montrealStarNav.goBack('');
  };

  const renderMontrealStarModal = () => (
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
      <MontrealStarView style={[montrealStarStyles.modalOverlay]}>
        <MontrealStarView style={montrealStarStyles.modalContent}>
          <MontrealStarImageBackground
            source={require('../../assets/images/montrealgwinbrd.png')}
            style={{
              width: 362,
              height: 223,
              padding: 20,
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
              style={{ flexDirection: 'row', gap: 18, marginTop: 10 }}
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
  );

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
            padding: 20,
            paddingHorizontal: 10,
          }}
        >
          <MontrealStarText style={montrealStarStyles.sanremowlcttl}>
            Welcome to Team Play-grab your friends!
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcsbttl, { marginBottom: 10 }]}
          >
            Guess real auction prices by choosing a band. Earn points for
            accuracy and race your friends to the top.
          </MontrealStarText>
          <MontrealStarText style={montrealStarStyles.sanremowlcsbttl}>
            For details, check the “Game Rules” section in the main menu.
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
            onPress={handleHomePress}
          />
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Next"
            onPress={() => setMontrealStarStep('setup')}
          />
        </MontrealStarView>
        {renderMontrealStarModal()}
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const renderMontrealStarSetup = () => (
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
            padding: 20,
            paddingHorizontal: 10,
          }}
        >
          <MontrealStarText style={montrealStarStyles.sanremowlcttl}>
            Please Setup the Game
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcsbttl, { marginBottom: 17 }]}
          >
            How many players?
          </MontrealStarText>
          <MontrealStarView style={montrealStarStyles.arrowRow}>
            <MontrealStarTouchableOpacity
              style={montrealStarStyles.arrowBtn}
              onPress={() =>
                setMontrealStarNumPlayers(
                  montrealStarNumPlayers > 2 ? montrealStarNumPlayers - 1 : 2,
                )
              }
            >
              <MontrealStarImage
                source={require('../../assets/images/montrealgmprev.png')}
              />
            </MontrealStarTouchableOpacity>
            <MontrealStarText style={montrealStarStyles.bigNumber}>
              {montrealStarNumPlayers}
            </MontrealStarText>
            <MontrealStarTouchableOpacity
              style={montrealStarStyles.arrowBtn}
              onPress={() =>
                setMontrealStarNumPlayers(
                  montrealStarNumPlayers < 6 ? montrealStarNumPlayers + 1 : 6,
                )
              }
            >
              <MontrealStarImage
                source={require('../../assets/images/montrealgmnxt.png')}
              />
            </MontrealStarTouchableOpacity>
          </MontrealStarView>
          <MontrealStarText style={montrealStarStyles.sanremowlcsbttl}>
            How many rounds?
          </MontrealStarText>
          <MontrealStarView style={montrealStarStyles.arrowRow}>
            <MontrealStarTouchableOpacity
              style={montrealStarStyles.arrowBtn}
              onPress={() => {
                const idx = montrealStarRoundsOptions.indexOf(
                  montrealStarNumRounds,
                );
                setMontrealStarNumRounds(
                  montrealStarRoundsOptions[idx > 0 ? idx - 1 : 0],
                );
              }}
            >
              <MontrealStarImage
                source={require('../../assets/images/montrealgmprev.png')}
              />
            </MontrealStarTouchableOpacity>
            <MontrealStarText style={montrealStarStyles.bigNumber}>
              {montrealStarNumRounds}
            </MontrealStarText>
            <MontrealStarTouchableOpacity
              style={montrealStarStyles.arrowBtn}
              onPress={() => {
                const idx = montrealStarRoundsOptions.indexOf(
                  montrealStarNumRounds,
                );
                setMontrealStarNumRounds(
                  montrealStarRoundsOptions[
                    idx < montrealStarRoundsOptions.length - 1
                      ? idx + 1
                      : montrealStarRoundsOptions.length - 1
                  ],
                );
              }}
            >
              <MontrealStarImage
                source={require('../../assets/images/montrealgmnxt.png')}
              />
            </MontrealStarTouchableOpacity>
          </MontrealStarView>
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
            onPress={handleHomePress}
          />
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Next"
            onPress={() => {
              setMontrealStarNames(Array(montrealStarNumPlayers).fill(''));
              setMontrealStarNamesErrors(
                Array(montrealStarNumPlayers).fill(false),
              );
              setMontrealStarStep('names');
            }}
          />
        </MontrealStarView>
        {renderMontrealStarModal()}
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const handleMontrealStarNamesNext = () => {
    let errors = montrealStarNames.map(
      (name, i, arr) =>
        name.length < 3 ||
        arr.findIndex((n, idx) => n === name && idx !== i) !== -1,
    );
    setMontrealStarNamesErrors(errors);
    if (errors.every(e => !e)) {
      setMontrealStarScores(Array(montrealStarNumPlayers).fill(0));
      setMontrealStarCurrentRound(1);
      setMontrealStarCurrentPlayer(0);
      setMontrealStarStep('game');
      setMontrealStarAllRoundScores([]);
      setMontrealStarRoundScores([]);
      setMontrealStarSelectedOption(null);
      setMontrealStarAnswerStatus(null);
    }
  };

  const renderMontrealStarNames = () => (
    <MontrealStarBackground>
      <MontrealStarView
        style={[montrealStarStyles.container, { alignItems: 'center' }]}
      >
        <MontrealStarImageBackground
          source={require('../../assets/images/montrealgminpbrd.png')}
          style={{
            width: 346,
            height: 562,
            padding: 20,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <MontrealStarText
              style={[montrealStarStyles.sanremowlcttl, { marginBottom: 5 }]}
            >
              Fill up the Player’s names
            </MontrealStarText>
            <MontrealStarText
              style={[montrealStarStyles.sanremowlcttlitl, { marginBottom: 5 }]}
            >
              Names must be at least 3 characters and unique.
            </MontrealStarText>
            {montrealStarNames.map((name, idx) => (
              <React.Fragment key={idx}>
                <MontrealStarText
                  style={[
                    montrealStarStyles.sanremowlcsbttl,
                    { marginBottom: 9, marginTop: 9 },
                  ]}
                >
                  Player {idx + 1}
                </MontrealStarText>
                <MontrealStarTextInput
                  key={idx}
                  style={[
                    montrealStarStyles.input,
                    montrealStarNamesErrors[idx] && { borderColor: 'red' },
                  ]}
                  value={name}
                  maxLength={15}
                  placeholder={`Type here...`}
                  placeholderTextColor={'#161616'}
                  onChangeText={text => {
                    let newNames = [...montrealStarNames];
                    newNames[idx] = text;
                    setMontrealStarNames(newNames);
                  }}
                />
              </React.Fragment>
            ))}
          </ScrollView>
        </MontrealStarImageBackground>
        <MontrealStarView
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: 10,
            justifyContent: 'center',
          }}
        >
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Menu"
            onPress={handleHomePress}
          />
          <MontrealStarMainBtn
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle="Next"
            onPress={handleMontrealStarNamesNext}
          />
        </MontrealStarView>
        {renderMontrealStarModal()}
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const montrealStarQuestionIdx =
    (montrealStarCurrentRound - 1) * montrealStarNumPlayers +
    montrealStarCurrentPlayer;
  const montrealStarQ =
    montrealStarQuestions[
      montrealStarQuestionIdx % montrealStarQuestions.length
    ];

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

    let newScores = [...montrealStarScores];
    newScores[montrealStarCurrentPlayer] += addScore;
    setMontrealStarScores(newScores);

    let newRoundScores = [...montrealStarRoundScores];
    newRoundScores[montrealStarCurrentPlayer] = addScore;
    setMontrealStarRoundScores(newRoundScores);
  };

  const handleMontrealStarNextPlayerOrRound = () => {
    setMontrealStarSelectedOption(null);
    setMontrealStarAnswerStatus(null);
    if (montrealStarCurrentPlayer + 1 < montrealStarNumPlayers) {
      setMontrealStarCurrentPlayer(montrealStarCurrentPlayer + 1);
    } else {
      let newAll = [...montrealStarAllRoundScores];
      newAll.push([...montrealStarRoundScores]);
      setMontrealStarAllRoundScores(newAll);
      setMontrealStarStep('roundResults');
    }
  };

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
            padding: 15,
            paddingHorizontal: 13,
            marginBottom: 20,
          }}
        >
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttl, { marginBottom: 6 }]}
          >
            Round {montrealStarCurrentRound}
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttlitl, { marginBottom: 5 }]}
          >
            {montrealStarQ.montrealStarQuestion}
          </MontrealStarText>
          <MontrealStarImage
            source={montrealStarQ.montrealStarImage}
            style={{
              borderRadius: 12,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 20,
              width: 170,
              height: 170,
            }}
          />
          {montrealStarSelectedOption ? (
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
                { marginBottom: 21, minHeight: 40 },
              ]}
            >
              {montrealStarNames[montrealStarCurrentPlayer]} pick one of the 5
              bands.
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
            btnTitle={'Next'}
            onPress={handleMontrealStarNextPlayerOrRound}
            isDisabled={montrealStarSelectedOption === null}
          />
        </MontrealStarView>
        {renderMontrealStarModal()}
      </MontrealStarView>
    </MontrealStarBackground>
  );

  const renderMontrealStarRoundResults = () => (
    <MontrealStarBackground>
      <MontrealStarView
        style={[montrealStarStyles.container, { alignItems: 'center' }]}
      >
        <MontrealStarImageBackground
          source={require('../../assets/images/montrealgminpbrd.png')}
          style={{
            width: 346,
            height: 562,
            padding: 30,
            paddingHorizontal: 33,
            marginBottom: 20,
          }}
        >
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttl, { marginBottom: 10 }]}
          >
            Round {montrealStarCurrentRound}
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremowlcttlitl, { marginBottom: 9 }]}
          >
            {montrealStarQ.montrealStarQuestion}
          </MontrealStarText>
          <MontrealStarImage
            source={require('../../assets/images/montrealgmpph.png')}
            style={{
              borderRadius: 12,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 30,
            }}
          />
          {montrealStarNames.map((name, idx) => (
            <MontrealStarView key={idx} style={montrealStarStyles.resultsRow}>
              <MontrealStarText style={montrealStarStyles.resultsCell}>
                {name}
              </MontrealStarText>
              <MontrealStarText style={montrealStarStyles.resultsCell}>
                {montrealStarRoundScores[idx] !== undefined
                  ? montrealStarRoundScores[idx] > 0
                    ? `+${montrealStarRoundScores[idx]}`
                    : `${montrealStarRoundScores[idx]}`
                  : '0'}
              </MontrealStarText>
            </MontrealStarView>
          ))}
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
            selectedPropImg={require('../../assets/images/montrealbtn.png')}
            btnTitle={'Next'}
            onPress={() => {
              if (montrealStarCurrentRound === montrealStarNumRounds) {
                setMontrealStarStep('finalResults');
              } else {
                setMontrealStarCurrentRound(montrealStarCurrentRound + 1);
                setMontrealStarCurrentPlayer(0);
                setMontrealStarRoundScores([]);
                setMontrealStarSelectedOption(null);
                setMontrealStarAnswerStatus(null);
                setMontrealStarStep('game');
              }
            }}
          />
        </MontrealStarView>
        {renderMontrealStarModal()}
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
          source={require('../../assets/images/montrealgmbrd1.png')}
          style={{
            width: 334,
            height: 348,
            padding: 30,
            paddingHorizontal: 30,
            marginBottom: 20,
          }}
        >
          <MontrealStarImage
            source={require('../../assets/anim/montrealanimwin.gif')}
            style={{
              width: 280,
              height: 280,
              position: 'absolute',
              top: -80,
              left: 35,
            }}
          />
          <MontrealStarText style={montrealStarStyles.sanremowlcttl}>
            The Game is Over!
          </MontrealStarText>
          <MontrealStarText
            style={[montrealStarStyles.sanremorestxt, { marginBottom: 8 }]}
          >
            Final leaderboard
          </MontrealStarText>
          {montrealStarNames.map((name, idx) => (
            <MontrealStarView key={idx} style={montrealStarStyles.resultsRow}>
              <MontrealStarText style={montrealStarStyles.resultsCell}>
                {name}
              </MontrealStarText>
              <MontrealStarText style={montrealStarStyles.resultsCell}>
                {montrealStarScores[idx]}
              </MontrealStarText>
            </MontrealStarView>
          ))}
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
        {renderMontrealStarModal()}
      </MontrealStarView>
    </MontrealStarBackground>
  );

  if (montrealStarStep === 'welcome') return renderMontrealStarWelcome();
  if (montrealStarStep === 'setup') return renderMontrealStarSetup();
  if (montrealStarStep === 'names') return renderMontrealStarNames();
  if (montrealStarStep === 'game') return renderMontrealStarGame();
  if (montrealStarStep === 'roundResults')
    return renderMontrealStarRoundResults();
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
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  sanremowlcsbttl: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  sanremowlcttlitl: {
    color: '#161616',
    fontSize: 15,
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
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtn: { padding: 16 },
  bigNumber: {
    color: '#161616',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 3,
    width: '100%',
    fontSize: 16,
    marginBottom: 3,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 14,
    color: '#161616',
    fontWeight: '300',
    fontStyle: 'italic',
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
    fontSize: 14,
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
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 0,
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
