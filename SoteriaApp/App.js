import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import CacheStore from 'react-native-cache-store';
import {StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './SplashScreen';



const AppNav = StackNavigator({
  Home: { screen: SplashScreen },
});


export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}