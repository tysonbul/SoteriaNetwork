import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import CacheStore from 'react-native-cache-store';
import {StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './SplashScreen';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeScannerScreen from './QRCodeScan';
import Home from './HomeScreen';



const AppNav = StackNavigator({
  Home: { screen: SplashScreen },
  QRCodeDisplay: { screen: QRCodeDisplay },
  QRCodeScanner: { screen: QRCodeScannerScreen },
  NewHome: { screen: Home },
  
});


export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}
