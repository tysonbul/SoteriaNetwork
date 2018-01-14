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

  GenerateKey(){

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
