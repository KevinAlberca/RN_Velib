import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import StationsList from './Components/StationsList';
import StationView from './Components/StationView';


export default class Velib extends Component {
  render() {
    return (
        <Router>
            <Scene key="StationsList" component={StationsList} title="Liste des Stations" initial={true} />
            <Scene key="StationView" component={StationView} />
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
