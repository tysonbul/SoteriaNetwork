import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import CacheStore from 'react-native-cache-store';
import {StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './SplashScreen';
import FaceDetection from './FaceDetectionScreen';
import PersonGroup from './PersonGroupScreen';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export const uuid = guid()
console.log(uuid)


const AppNav = StackNavigator({
  Home: { screen: SplashScreen },
  FaceDetection: { screen: FaceDetection },
  PersonGroup: { screen: PersonGroup }
});

export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}
