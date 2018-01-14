import React, { Component, } from 'react';
import { StyleSheet, TouchableHighlight, ActivityIndicator, ListView, Text, View, StatusBar, Button, TextInput } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';
// import KeyPair from './crypt'



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

  home = () => {
    this.props.navigation.navigate('NewHome');
  }

  qrCodeDisplay = (publickey) => {
    this.props.navigation.navigate('QRCodeDisplay', publickey);
  }

  qrCodeScanner = () => {
    this.props.navigation.navigate('QRCodeScanner');
  }

  GenerateKey(){

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


      </View>
    )
  }

}
