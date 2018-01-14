'use strict';

import React, { Component } from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    ListView,
    TouchableHighlight,
    StatusBar,
    AsyncStorage,
    Switch
} from 'react-native';

export default class Settings extends Component {

    static navigationOptions = ({ navigation }) =>{
        const { params = {} } = navigation.state;
        return {
            title: 'Settings'
            }
    }

    constructor(props) {
        super(props);
        // console.log(contacts);
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // showAllCoins: false,
            isLoading: true,
            // dataSource: ds.cloneWithRows([]),
            // serPub: null,
            // serSec: null,
            // uuid: null,  
          };
        AsyncStorage.getItem('enabled2FA').then((enabled) => {
        //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //   console.log(JSON.parse(contacts));
          this.setState({enabled2FA:enabled == 'true', isLoading: false})
        });
    };



    render() {
        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
          return (
            <View style={{flex: 1}}>
              <Text>Loading</Text>
            </View>
          );
        }


        return (
          <View style={{flex: 1}}>
            <StatusBar style={styles.StatusBarColor}/>
            <Switch 
                value={this.state.enabled2FA}
                onValueChange={(value)=>{
                    this.setState({enabled2FA:value});
                    console.log("VALUE AFTER SWITCH EVENT: "+value);
                    AsyncStorage.setItem('enabled2FA', value).then(()=>{AsyncStorage.getItem('enabled2FA')});
                }}
                />
          </View>
        );
      }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    row: {
      color: 'black',
      textAlign: 'center'
    },

    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    button:{
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 15,
      paddingBottom: 30,
      borderBottomColor: '#d9d9d9',
      borderBottomWidth: 1
    },

    centerText:{
      textAlign: 'center'
    },

    StatusBarColor:{
      backgroundColor:'#f4a041'
    },

    Option:{
      paddingBottom: 15,
    },

    transationDetailRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomColor: '#d9d9d9',
      borderBottomWidth: 1
    }
  });
