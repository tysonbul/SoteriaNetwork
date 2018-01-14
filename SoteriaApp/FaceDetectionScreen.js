import React, { Component, } from 'react';
import { StyleSheet, TouchableHighlight, ActivityIndicator, ListView, Text, View, StatusBar, Button, TextInput } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';



export default class FaceDetection extends Component {
    render() {
        
        return(
          <View style={styles.container}>
            <Text style={styles.splashText}>
              Soteria
            </Text>
            {/* <Button
              onPress={this.GenerateKey.bind(this)}
              title="Generate Public Key"
            />
            <Button
              onPress={this.detectFace.bind(this)}
              title="Detect face"
            /> */}
    
          </View>
        )
      }

}