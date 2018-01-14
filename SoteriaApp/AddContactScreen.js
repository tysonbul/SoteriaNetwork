'use strict';

import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {StackNavigator, NavigationActions} from 'react-navigation';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    AsyncStorage
} from 'react-native';

export default class AddContact extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Add Contact',
     });

  constructor(props) {
    super(props);
    this.qrcodevalue = props.navigation.state.params;
    console.log(this.qrcodevalue);
    this.state = {
        contactName: '',
        contactAddress: ''
    };
  };

  _unserializePublicKey(data){
    /* To be filled in with serialization code*/
    return data
  }

  onSelect = data => {
    this.setState(data);
  };

  saveContactInfo(){
    /* Add code that saves the contact info */
    console.log(this.state);
    let contactName = this.state.contactName;
    let contactAddress = this.state.contactAddress;

    let user = {contactName: contactAddress}
    this.saveUserDict(user);


  }

  async saveUserDict(newUser){
    try{
      var userDict = await AsyncStorage.getItem('userDict');
      console.log(userDict)
      userDict.push(newUser);
      AsyncStorage.setItem('userDict', userDict);
    }catch(error){
      console.log(error)
    }

    // Go back to home screen after success
    this.toHomeScreen();

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

  _scanQR(){
    this.props.navigation.navigate('QRCodeScanner', { onSelect: this.onSelect });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingBottom:20, minWidth:100}}>
            <TextInput
                placeholder='Contact Name'
                placeholderTextColor='grey'
                value={this.state.contactName}
                onChangeText={(text)=>{this.setState({contactName:text})}}
            />
            <View style={{flexDirection:'row'}}>
                <TextInput
                style={{minWidth:200}}
                    placeholder='Address (Scan QR Code)'
                    placeholderTextColor='grey'
                    editable={false}
                    value={this.state.contactAddress}
                    onChangeText={(text)=>{this.setState({contactAddress:text})}}
                />
                <Button
                title="Scan"
                onPress={this._scanQR.bind(this)}
                />
            </View>
        </View>
        <QRCode
          value={this.qrcodevalue}
          size={200}
          bgColor='black'
          fgColor='white'/>
          <Text
          style={{paddingBottom:10, paddingTop:10}}
          >
          Have your new contact scan this QR Code</Text>
          <Button
            title='Add Contact'
            disabled={this.state.contactAddress == ''}
            onPress={this.saveContactInfo.bind(this)}
          />
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

    // input: {
    //     height: 40,
    //     borderColor: 'gray',
    //     borderWidth: 1,
    //     margin: 10,
    //     borderRadius: 5,
    //     padding: 5,
    // }
});
