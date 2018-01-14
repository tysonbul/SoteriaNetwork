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
      const serPub = await AsyncStorage.getItem('serPub');
      const serSec = await AsyncStorage.getItem('serSec');
      console.log(serPub);
      console.log(serSec);
      if(serPub == null || serSec == null){
        this.GenerateKey();
      }
    }catch(error){};

    this.setState({
      isLoading: false
    })
  }



  GenerateKey(){
     var a = new KeyPair();
     console.log(a);
     var serSec = a.SerializeSecretKey();
     var serPub = a.SerializePublicKey();
    //  var check = a.UnserializePublicKey(serPub);
    AsyncStorage.setItem('serPub', serPub);
    AsyncStorage.setItem('serSec', serSec);
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1 }}>
          <StatusBar style={styles.StatusBarColor} />
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <Text style={styles.splashText}>
          Soteria
        </Text>
      </View>
    )
  }

}
