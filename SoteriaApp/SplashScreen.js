import React, { Component, } from 'react';
import { AsyncStorage, StyleSheet, TouchableHighlight, ActivityIndicator, ListView, Text, View, StatusBar, Button, TextInput } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';
import KeyPair from './crypt';
// import CacheStore from 'react-native-cache-store';
// import store from 'react-native-simple-store';
// var safeObject = require('safeObject')




export default class SplashScreen extends Component {

  static navigationOptions = ({ navigation }) =>{
    const { params = {} } = navigation.state;
    return {
      header: null
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  };

  componentDidMount(){
    this.fetchKeys();
  }

  async fetchKeys(){
    try{
      const serPub = null;
      const serSec = null;
      const uuid = null;
      console.log(serPub);
      console.log(serSec);
      if(serPub == null || serSec == null || uuid == null){
        this.GenerateUser();

      }
    }catch(error){};

    this.toHomeScreen();
  }



  GenerateUser(){
     var a = new KeyPair();
     console.log(a.userDict)
     var serSec = a.SerializeSecretKey();
     var serPub = a.SerializePublicKey();
     AsyncStorage.setItem('serPub', serPub);
     AsyncStorage.setItem('serSec', serSec);
     AsyncStorage.setItem('uuid', a.uuid);
     AsyncStorage.setItem('userDict', a.userDict);
  }


  toHomeScreen = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }


  detectFace = () => {
    this.props.navigation.navigate('FaceDetection')
  }

  createPersonGroup = () =>  {
    this.props.navigation.navigate('PersonGroup')
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.splashText}>
            Soteria
          </Text>
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <Text style={styles.splashText}>
          Soteria
        </Text>
        <Button
          onPress={this.home.bind(this)}
          title="Home"
        />
        <Button
          onPress={this.GenerateKey.bind(this)}
          title="Generate Public Key"
        />
        <Button
          onPress={this.detectFace.bind(this)}
          title="Detect face"
        />
        <Button
          onPress={this.createPersonGroup.bind(this)}
          title="Create face recognition profile"
        />
        <Button
          onPress={this.qrCodeDisplay.bind(this, 'http://localhost')}
          title="Display QRCode"
        />
        <Button
          onPress={this.qrCodeScanner.bind(this)}
          title="Scan QRCode"
        />

  }

}
