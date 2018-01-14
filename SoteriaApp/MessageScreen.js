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
    ActivityIndicator,
    KeyboardAvoidingView
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
          error: false,
          newMessage: '',
          listHeight: 0,
          scrollViewHeight: 0
        }

        
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     showAllCoins: false,
        //     isLoading: false,
        //     dataSource: ds.cloneWithRows(['hi', 'hello'])
        //   };
    };

    componentDidMount() {
      return this.fetchMessages();
    };

    fetchMessages(){
      fetch(server_address + '/transactions/since/0')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.props.navigation.setParams({allCoins:true})
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson['msgs'])
        }, function() {
          // do something with new state
          // this.listView ? this.listView.scrollToEnd() : ()=>null;
        });
        // TODO: Update the local index

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
          errorMsg: error.toString(),
          error: true
        });
      });
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


    _sendMessage(){
      let message = this.state.newMessage;
      fetch(server_address + '/transactions/new', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msg: message
        })
      }).then(()=>{
        fetch(server_address + '/mine')
      }).then(this.fetchMessages.bind(this)).then(()=>{
        this.setState({newMessage:''})
      });
    }


    // componentDidUpdate(){
    //   console.log('mlhadjfhaldskhlkjh');
    //   this.listView.scrollToEnd()
    // }

    _scrollToBottom(){
      this.listView.scrollToEnd();
    }

    render() {
      const { navigate } = this.props.navigation;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1 }}>
            <StatusBar style={styles.StatusBarColor} />
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
        <View style={{flex: 1}}>
          <StatusBar style={styles.StatusBarColor}/>
          <ListView
            ref={listView => { this.listView = listView; }}
            onEndReached={this._scrollToBottom.bind(this)}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.buttonWrapper}>
                <TouchableHighlight underlayColor='#777' style={styles.button}>
                  <Text style={styles.row}>{rowData.msg}</Text>
                </TouchableHighlight>
              </View>}
          />
        </View>
        <View style={{flexDirection:'row', alignSelf: "stretch", paddingBottom:10}}> 
            <TextInput
                style={{width:300, borderWidth:1}}
                placeholder='Aa'
                placeholderTextColor='grey'
                value={this.state.newMessage}
                onChangeText={(text)=>{this.setState({newMessage:text})}}
            />
            <Button
            title="Send"
            onPress={this._sendMessage.bind(this)}
            style={{alignSelf:'right'}}
            />
        </View>
        </KeyboardAvoidingView>
      );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    row: {
      color: 'black',
      textAlign: 'left',
      alignSelf: 'stretch',
      paddingLeft:20
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