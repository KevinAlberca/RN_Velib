import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class StationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey : 'mySecretKeyForAPI',
            apiBase : 'https://api.jcdecaux.com/vls/v1',
            dataSource: []
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
                <Text>{this.props.id}</Text>
                <Text>{this.state.dataSource.name}</Text>
                <Text>{this.state.dataSource.address}</Text>
                <Text>{this.state.dataSource.contract_name}</Text>
                <Text>{this.state.dataSource.status}</Text>
                <Text>{this.state.dataSource.bike_stands}</Text>
                <Text>{this.state.dataSource.available_bike_stands}</Text>
                <Text>{this.state.dataSource.available_bikes}</Text>
                <Text>{this.state.dataSource.last_update}</Text>
                <Text>Reste a afficher la position</Text>
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
    backgroundColor: '#F5FCFF',
    paddingTop:70
  },
});
