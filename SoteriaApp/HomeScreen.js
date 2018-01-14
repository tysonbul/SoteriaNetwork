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
        return {
            title: 'Sorteria Messenger',
            headerRight: (<Button
                onPress={params.addContact ? params.addContact : () => null}
                title='Add Contact'
                />)
            }
    }
    
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showAllCoins: false,
            isLoading: false,
            dataSource: ds.cloneWithRows(['hi', 'hello'])
          };
    };

    _getSerializedPublicKey(){
      /* Add code to get serialized public key from storage*/
      return '0xf2369873297856';
    }

    _addContact = (publickey) => {
        this.props.navigation.navigate('AddContact', this._getSerializedPublicKey());
      }

    _goToMessages(){
      this.props.navigation.navigate('Message');
    }

    componentDidMount() {
        this.props.navigation.setParams({ addContact: this._addContact.bind(this) });
      };

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={{flex: 1}}>
            <StatusBar style={styles.StatusBarColor}/>
            <ListView
            dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.buttonWrapper}>
                  <TouchableHighlight underlayColor='#777' onPress={this._goToMessages.bind(this)} style={styles.button}>
                    <Text style={styles.row}>{rowData}{'\n'}Available: {rowData}</Text>
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