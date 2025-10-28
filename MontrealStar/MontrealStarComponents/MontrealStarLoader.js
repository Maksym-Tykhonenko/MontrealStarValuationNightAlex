import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

const MontrealStarLoader = () => {
  const montrealStarLoaderHtml = `
   <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: transparent;
          }
          .loading-spinner {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 8em;
          }
          .loading-spinner-inner {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading-spinner-circle {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background-color: #db9334;
            margin: 0 5px;
            animation: loading-spinner 1s ease-in-out infinite;
          }
          .loading-spinner-circle:nth-child(2) { animation-delay: 0.2s; }
          .loading-spinner-circle:nth-child(3) { animation-delay: 0.4s; }
          .loading-spinner-circle:nth-child(4) { animation-delay: 0.6s; }
          .loading-spinner-circle:nth-child(5) { animation-delay: 0.8s; }
          @keyframes loading-spinner {
            0% { transform: scale(1); opacity: 1; }
            20% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="loading-spinner">
          <div class="loading-spinner-inner">
            <div class="loading-spinner-circle"></div>
            <div class="loading-spinner-circle"></div>
            <div class="loading-spinner-circle"></div>
            <div class="loading-spinner-circle"></div>
            <div class="loading-spinner-circle"></div>
          </div>
        </div>
      </body>
    </html>
  `;

  return (
    <ImageBackground
      source={require('../../assets/images/montrealldrbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: 600 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.montrealcnt}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/montrealldr.png')}
              style={{ width: 218, height: 303 }}
            />
          ) : (
            <Image
              source={require('../../assets/images/andric.png')}
              style={{ width: 218, height: 260, borderRadius: 22 }}
            />
          )}
        </View>

        <View style={styles.montrealwrpr}>
          <WebView
            originWhitelist={['*']}
            source={{ html: montrealStarLoaderHtml }}
            style={{ width: 150, height: 50, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  montrealcnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  montrealwrpr: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
  },
});

export default MontrealStarLoader;
