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
    Button
} from 'react-native';
 
export default class QRCodeComp extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Add Contact',
     });

  constructor(props) {
    super(props);
    this.qrcodevalue = props.navigation.state.params;
    this.state = {
        contactName: '',
        contactAddress: ''
    };
  };

  onSelect = data => {
    this.setState(data);
  };

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
            onPress={()=>{}}
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