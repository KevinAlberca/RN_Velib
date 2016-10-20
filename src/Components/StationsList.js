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
import StationView from './StationView';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class StationsList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            apiKey : 'mySecretKeyForAPI',
            apiBase : 'https://api.jcdecaux.com/vls/v1',
            dataSource : new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2,
             }),
        };

        this.getStationsData();
    }

    getStationsData() {
        return fetch(this.state.apiBase + '/stations?contract=Paris&apiKey=' + this.state.apiKey)
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJSON)
                });
                return responseJSON;
            })
            .catch((error) => {
              console.error(error);
            });
    }

    renderRow(rowData, rowID) {
        const goToStationView = () => Actions.StationView({id: rowData.number});
        return (
            <TouchableOpacity style={styles.item} onPress={goToStationView}>
                <Text style={styles.bold}>{rowData.name}</Text>
                <Text style={styles.bold}>{rowData.number}</Text>
                <Text>adress : {rowData.address}</Text>
                <Text>status : {rowData.status}</Text>
                <Text style={styles.bold}>
                    <Text style={{color: 'green'}}>{rowData.available_bikes}</Text> / <Text style={{color: 'red'}}>{rowData.bike_stands}</Text>
                </Text>
            </TouchableOpacity>
        )
    }

  render() {
    return (
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
          />
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
  header: {
    width: width,
    alignItems: 'center',
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#F0F0F0',
    height: 60,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0066ff',
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#ecf0f1',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
  bold: {
      fontWeight: 'bold'
  }
});
