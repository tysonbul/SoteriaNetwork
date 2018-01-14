'use strict';
 
import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {StackNavigator, NavigationActions} from 'react-navigation';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class QRCodeComp extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Share Address',
     });

  constructor(props) {
    super(props);
    this.qrcodevalue = props.navigation.state.params
  };
 
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.qrcodevalue}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});