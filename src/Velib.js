import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import StationsList from './Components/StationsList';
import StationView from './Components/StationView';


export default class Velib extends Component {
  render() {
    return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonIconStyle={styles.barButtonIconStyle}>
            <Scene key="StationsList" component={StationsList} title="Liste des stations" initial={true} />
            <Scene key="StationView" component={StationView} title="Votre station"/>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  navBar: {
    backgroundColor:'#0D47A1',
},
  navBarTitle:{
      color:'#FFFFFF',
      fontSize: 20
  },
  barButtonIconStyle:{
      tintColor:'rgb(255,255,255)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  root: {
    flex:1,
    backgroundColor:'red',
    shadowColor:'red'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
