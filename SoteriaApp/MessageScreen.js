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
    StatusBar
} from 'react-native';

import {server_address} from './App';

export default class Message extends Component {
    
    static navigationOptions = ({ navigation }) =>{
        const { params = {} } = navigation.state;
        return {
            title: 'Contact Name'
            }
    }
    
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          errorMsg: '',
          error: false
        }

        
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     showAllCoins: false,
        //     isLoading: false,
        //     dataSource: ds.cloneWithRows(['hi', 'hello'])
        //   };
    };

    fetchMessages(){

    }

    // _addContact = (publickey) => {
    //     this.props.navigation.navigate('QRCodeDisplay', publickey);
    //   }

    // _goToMessages(){
    //     console.log('hii going to messages');
    // }

    // componentDidMount() {
    //     this.props.navigation.setParams({ addContact: this._addContact.bind(this) });
    //     // return this.fetchPortfolio();
    //   };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View/>
        //   <View style={{flex: 1}}>
        //     <StatusBar style={styles.StatusBarColor}/>
        //     <ListView
        //     dataSource={this.state.dataSource}
        //       renderRow={(rowData) =>
        //         <View style={styles.buttonWrapper}>
        //           <TouchableHighlight underlayColor='#777' onPress={this._goToMessages.bind(this)} style={styles.button}>
        //             <Text style={styles.row}>{rowData}{'\n'}Available: {rowData}</Text>
        //           </TouchableHighlight>
        //         </View>}
        //     />
        //   </View>
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