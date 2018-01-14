import React, { Component, } from 'react';
import { AsyncStorage, StyleSheet, TouchableHighlight, ActivityIndicator, ListView, Text, View, StatusBar, Button, TextInput } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';
import KeyPair from './crypt';
import { Components ,LinearGradient, Font} from 'expo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
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
      fontLoaded: false,
    }
  };

  async componentDidMount(){
    await Font.loadAsync({
      'RobotoSlab': require('./Fonts/Cabin-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
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


  // detectFace = () => {
  //   this.props.navigation.navigate('FaceDetection')
  // }

  // createPersonGroup = () =>  {
  //   this.props.navigation.navigate('PersonGroup')
  // }


  render() {
      return (
        <View style={{ flex: 1 }}>
       <View style={{ backgroundColor: 'rgba(51,255,186,1) ', flex: 1 }} />
       <LinearGradient
         colors={['rgb(130, 255, 238)', 'transparent']}
         style={{
           position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           height: 300,
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
       {this.state.fontLoaded ? (<Text style={styles.splashText, {fontFamily: 'RobotoSlab', color: 'white', fontSize:35}}>Soteria</Text>) : null}
     </LinearGradient>
     </View>
      );
  }

}
