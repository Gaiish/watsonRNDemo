import React, {Component} from 'react'
import {
  Container, Content, Button, Icon, Text, Fab, Header,
  Title, Body, Left, Spinner
} from 'native-base'

import Permissions from 'react-native-permissions'

import {StyleSheet, View, Alert, } from 'react-native'

import {SpeechToText} from 'react-native-watson'


export default class App extends Component{
  constructor(){
    super()
    this.state = {
      text:'...',
      recording: false
    }
  }

  record(){
    this.setState({recording:true})
    SpeechToText.startStreaming((error, text)=>{
      console.log(text)
      this.setState({text})
    })
  }
  stopRecord(){
    this.setState({recording:false})
    Alert.alert('stopped recoding:')
    SpeechToText.stopStreaming()
  }

  componentDidMount(){
    this.checkPermissions()

    SpeechToText.initialize(YOUR_IBM_WATSON_USERNAME, YOUR_IBM_WATSON_PASSWORD)
  }

  checkPermissions = ()=>{
    const p= Permissions.check('microphone')
    //Alert.alert('permission check',p)
    if(p==='authorized') return;
    this.requestPermission()
  }

  requestPermission(){
    const p = Permissions.request('microphone')
    //Alert.alert('permission request',p)
  }

  render(){
    return(
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Genius List</Title>
          </Body>
        </Header>
        <View style={{flex:1}}>
          <Text style={styles.txt}>{this.state.text}</Text>
          {this.state.recording?(
            <Spinner
               color='blue' />

          ):(
            <Text style={styles.txt1} note>record now</Text>
          )}
          <Fab
            position='bottomRight'
            onPressIn={()=>this.record()}
            onPressOut={()=>this.stopRecord()}
            >
            <Icon name='mic' />
          </Fab>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
     backgroundColor: '#5067FF',
     position: 'absolute',
     bottom: 30,
     right:25
  },
  txt:{
    padding: 50,
    fontSize: 25
  },
  txt1:{
    padding: 50,
    fontSize: 30
  }
})
