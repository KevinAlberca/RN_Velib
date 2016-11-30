import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  Animation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class StationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey : 'mySecretKeyForAPI',
            apiBase : 'https://api.jcdecaux.com/vls/v1',
            dataSource: [],

        };

        this.getStationData();
    }

    getStationData() {
        return fetch(this.state.apiBase + '/stations/' + this.props.id + '/?contract=Paris&apiKey='+ this.state.apiKey)
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    dataSource: responseJSON
                });
                return responseJSON;
            })
            .catch((error) => {
              console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Animatable.Text animation="zoomInUp">{this.props.id}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.name}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.address}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.contract_name}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.status}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.bike_stands}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.available_bike_stands}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">{this.state.dataSource.available_bikes}</Animatable.Text>
                <Animatable.Text animation="zoomInUp">(this.state.dataSource.last_update}</Animatable.Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f4',
    paddingTop:70
  },
  test: {
    width: 400,
    height: 400,
    backgroundColor: 'blue',
    opacity: 0
  }
});
