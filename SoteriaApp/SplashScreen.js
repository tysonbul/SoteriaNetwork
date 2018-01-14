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
    this.setState({
      isLoading: false
    })
  }

  GenerateKey(){
     var a = new KeyPair();
     console.log(a);
     var serPub = a.SerializeSecretKey();
     var serSec = a.SerializePublicKey();
     console.log(serPub);
    // JSON.stringify(safeObject(obj));
    // deJSON = JSON.parse(obj)
    // console.log(deJSON)
    // console.log(a === deJSON)
    // AsyncStorage.setItem('keyPair', obj)
    // fetched = AsyncStorage.getItem('keyPair');
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
        <Button
          onPress={this.GenerateKey.bind(this)}
          title="Generate Public Key"
        />

      </View>
    )
  }

}
