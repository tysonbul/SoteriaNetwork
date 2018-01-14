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
    AsyncStorage
} from 'react-native';
import KeyPair from './crypt';

export default class Home extends Component {

    static navigationOptions = ({ navigation }) =>{
        const { params = {} } = navigation.state;
        headerLeft: null;
        return {
            title: 'Sorteria Messenger',
            headerRight: (<Button
                onPress={params.addContact ? params.addContact : () => null}
                title='Add Contact'
                />)
            }
            headerLeft: null

    }

    constructor(props) {
        super(props);
        // console.log(contacts);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showAllCoins: false,
            isLoading: true,
            dataSource: ds.cloneWithRows([]),
            serPub: null,
            serSec: null,
            uuid: null,
          };
        AsyncStorage.getItem('userDict').then((contacts) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          console.log(JSON.parse(contacts));
          this.setState({dataSource:ds.cloneWithRows(JSON.parse(contacts))})
        });
    };

    _getSerializedPublicKey(){
      let enc = this.state.serEncPub;
      let sign = this.state.serSignPub;

      var ContactAddr = {"serEncPub": enc, "serSignPub": sign};
      return JSON.stringify(ContactAddr);
    }

    _addContact = (publickey) => {
        this.props.navigation.navigate('AddContact', this._getSerializedPublicKey(), );
      }

    _goToMessages(contactName, contactAddress){
      let params = {"contactName": contactName, "contactAddress": contactAddress, "serEncSec": this.state.serEncSec, "serEncPub": this.state.serEncPub, "serSignSec": this.state.serSignSec, "serSignPub": this.state.serSignPub}
      console.log(params);
      this.props.navigation.navigate('Message', params);
    }

    componentDidMount() {
        this.props.navigation.setParams({ addContact: this._addContact.bind(this) });
        this.fetchKeys();
      };

      async fetchKeys(){
        try{
          const serEncPub = await AsyncStorage.getItem('serEncPub');
          const serEncSec = await AsyncStorage.getItem('serEncSec');

          const serSignPub = await AsyncStorage.getItem('serSignPub');
          const serSignSec = await AsyncStorage.getItem('serSignSec');


          const uuid = await AsyncStorage.getItem('uuid');
          const userArray = await AsyncStorage.getItem('userDict');
          let userDict = JSON.parse(userArray);
          console.log(serSignPub);
          console.log(serEncSec);
          this.setState({
            serEncPub: serEncPub,
            serEncSec: serEncSec,
            serSignPub: serSignPub,
            serSignSec: serSignSec,
            uuid: uuid,
            userDict: userDict,
            isLoading: false
          })
        }catch(error){
          console.log(error);
        };

      }

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
            <ListView
            dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.buttonWrapper}>
                  <TouchableHighlight underlayColor='#777' onPress={this._goToMessages.bind(this, rowData.contactName, rowData.contactAddress)} style={styles.button}>
                    <Text style={styles.row}>{rowData.contactName}</Text>
                  </TouchableHighlight>
                </View>}
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
