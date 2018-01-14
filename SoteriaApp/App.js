import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import CacheStore from 'react-native-cache-store';
import {StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './SplashScreen';
import FaceDetection from './FaceDetectionScreen';
import PersonGroup from './PersonGroupScreen';
import AddContact from './AddContactScreen';
import QRCodeScannerScreen from './QRCodeScan';
import Home from './HomeScreen';
import Message from './MessageScreen';

export const server_address = 'http://10.110.0.129:5001';
// import {createStore, applyMiddleware} from 'redux';
// import { Provider, connect } from 'react-redux'

// function guid() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   };
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//     s4() + '-' + s4() + s4() + s4();
// };

// export const uuid = guid()
// console.log(uuid)


const AppNav = StackNavigator({
  Splash: {screen: SplashScreen},
  Home: { screen: Home },
  AddContact: { screen: AddContact },
  QRCodeScanner: { screen: QRCodeScannerScreen },
  Message: { screen: Message },
  FaceDetection: { screen: FaceDetection },
  PersonGroup: { screen: PersonGroup },
});

export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}
