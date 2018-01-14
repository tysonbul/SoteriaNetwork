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
      let keys = ['serEncPub', 'serSignPub', 'serEncSec', 'serSignSec', 'uuid', 'userDict'];
      await AsyncStorage.multiRemove(keys,(error)=>{
        console.log("clear error");
        console.log(error);
      });
      const serEncPub = await AsyncStorage.getItem('serEncPub');
      const serSignSec = await AsyncStorage.getItem('serSignSec');
      const uuid = await AsyncStorage.getItem('uuid');
      console.log(serEncPub);
      console.log(serSignSec);
      if(serEncPub == null || serSignSec == null || uuid == null){
        this.GenerateUser();

      }
    }catch(error){
      console.log(error);
    };
    this.toHomeScreen();
  }



  GenerateUser(){
     var a = new KeyPair();
     console.log(a);
     var serEncSec = a.SerializeEncSecretKey();
     var serEncPub = a.SerializeEncPublicKey();
     console.log(serEncSec);
     var serSignSec = a.SerializeSignSecretKey();
     var serSignPub = a.SerializeSignPublicKey();
     console.log(serSignSec);
     var userArray = JSON.stringify(a.userDict);
     AsyncStorage.setItem('serEncPub', serEncPub);
     AsyncStorage.setItem('serEncSec', serEncSec);

     AsyncStorage.setItem('serSignPub', serSignPub);
     AsyncStorage.setItem('serSignSec', serSignSec);

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
