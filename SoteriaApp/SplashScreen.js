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
    console.log('Construvctor called again');
    console.log(this.state)
    this.state = {
      isLoading: true,
    }
    AsyncStorage.getItem("enabled2FA").then((enabled)=>{
      if (enabled) {
        console.log('going to face detect');
        this._scanFace.bind(this)();
      }else{
        console.log("heading home the easy way")
        this.toHomeScreen();
      }
    });
    
  };

  componentDidMount(){
    this.fetchKeys();
  }

  onSelect = data => {
    this.setState(data, ()=>{
      if (this.state.passedScan){
        console.log('going to home')
        this.toHomeScreen();
      }
    });
  };

  _scanFace(){
    this.props.navigation.navigate('FaceDetection', { onSelect: this.onSelect });
  }

  async fetchKeys(){
    try {
      //let keys = ['serPub','serSec', 'userDict'];
      // await AsyncStorage.multiRemove(keys,(error)=>{
      //   console.log("clear error");
      //   console.log(error);
      // });
      const serPub = await AsyncStorage.getItem('serPub');
      const serSec = await AsyncStorage.getItem('serSec');
      const uuid = await AsyncStorage.getItem('uuid');
      console.log(serPub);
      console.log(serSec);
      if(serPub == null || serSec == null || uuid == null){
        this.GenerateUser();
      }
    
      // const enabled2FA = await AsyncStorage.getItem("enabled2FA");
      // console.log("2FA VAR: " + enabled2FA);
      // if (enabled2FA) {
      //   this._scanFace.bind(this)();
      //   // this.check2FA();
      //   return;
      // }

    }catch(error){};

    // this.toHomeScreen();
  }



  GenerateUser(){
     var a = new KeyPair();
     console.log(a.userDict);
     var serSec = a.SerializeSecretKey();
     var serPub = a.SerializePublicKey();
     var userArray = JSON.stringify(a.userDict);
     AsyncStorage.setItem('serPub', serPub);
     AsyncStorage.setItem('serSec', serSec);
     AsyncStorage.setItem('uuid', a.uuid);
     AsyncStorage.setItem('userDict', userArray);
  }

  

  check2FA = () => {
    this.props.navigation.navigate('FaceDetection');
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




  // detectFace = () => {
  //   this.props.navigation.navigate('FaceDetection')
  // }

  // createPersonGroup = () =>  {
  //   this.props.navigation.navigate('PersonGroup')
  // }


  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.splashText}>
            Soteria
          </Text>
        </View>
      );
  }

}
