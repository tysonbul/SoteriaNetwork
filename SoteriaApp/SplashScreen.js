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
      let keys = ['serPub','serSec', 'uuid', 'userDict'];
      await AsyncStorage.multiRemove(keys,(error)=>{
        console.log("clear error");
        console.log(error);
      });
      const serPub = await AsyncStorage.getItem('serPub');
      const serSec = await AsyncStorage.getItem('serSec');
      const uuid = await AsyncStorage.getItem('uuid');
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
     console.log(a.userDict);
     var serSec = a.SerializeSecretKey();
     var serPub = a.SerializePublicKey();
     var userArray = JSON.stringify(a.userDict);
     AsyncStorage.setItem('serPub', serPub);
     AsyncStorage.setItem('serSec', serSec);
     AsyncStorage.setItem('uuid', a.uuid);
     AsyncStorage.setItem('userDict', userArray);
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


  render() {
    //if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.splashText}>
            Soteria
          </Text>
        </View>
      );
    //}


  }

}
