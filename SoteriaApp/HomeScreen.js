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
      return this.state.serPub;
    }

    _addContact = (publickey) => {
        this.props.navigation.navigate('AddContact', this._getSerializedPublicKey(), );
      }

    _goToMessages(contactName){
      this.props.navigation.navigate('Message', contactName);
    }

    componentDidMount() {
        this.props.navigation.setParams({ addContact: this._addContact.bind(this) });
        this.fetchKeys();
      };

      async fetchKeys(){
        try{
          const serPub = await AsyncStorage.getItem('serPub');
          const serSec = await AsyncStorage.getItem('serSec');
          const uuid = await AsyncStorage.getItem('uuid');
          const userArray = await AsyncStorage.getItem('userDict');
          let userDict = JSON.parse(userArray);
          console.log(serPub);
          console.log(serSec);
          this.setState({
            serPub: serPub,
            serSec: serSec,
            uuid: uuid,
            userDict: userDict,
            isLoading: false
          })
        }catch(error){};

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
                  <TouchableHighlight underlayColor='#777' onPress={this._goToMessages.bind(this, rowData.contactName)} style={styles.button}>
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
