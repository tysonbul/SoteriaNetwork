import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import CacheStore from 'react-native-cache-store';
import {StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './SplashScreen';
import AddContact from './AddContactScreen';
import QRCodeScannerScreen from './QRCodeScan';
import Home from './HomeScreen';
import Message from './MessageScreen';

export const server_address = 'http://10.110.26.134:5000';

const AppNav = StackNavigator({
  Home: { screen: Home },
  // Home: { screen: SplashScreen },
  AddContact: { screen: AddContact },
  QRCodeScanner: { screen: QRCodeScannerScreen },
  Message: { screen: Message },
  
});


export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}
