import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  RefreshControl,
} from 'react-native';

import MapView from 'react-native-maps';
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
            region: {
              latitude: 48.86618153714896,
              longitude: 2.37329241140036,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            refreshing: false,
        };
    }

    componentWillMount() {
        this.getLocation();
        this.fetchStationsList();
    }

    fetchStationsList() {
        return fetch(this.state.apiBase + '/stations?contract=Paris&apiKey=' + this.state.apiKey)
            .then((response) => response.json())
            .then((responseJSON) => {
                stations = responseJSON;
                for(var s in stations) {
                    var distance = this.calcDistanceBetweenUserAndStation(stations[s].position.lat, stations[s].position.lng);
                    stations[s].distance = distance;
                    stations.sort(function (a, b) {
                      if (a.distance > b.distance)
                        return 1;
                      if (a.distance < b.distance)
                        return -1;
                      // a doit être égale à b
                      return 0;
                  });
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(stations),
                });
                AsyncStorage.setItem('VelibList', JSON.stringify(stations));
                return stations;
            })
            .catch((error) => {
              console.error(error);
            });
    }

    calcDistanceBetweenUserAndStation(station_lat, station_lng) {
        var user_lat = this.state.region.latitude,
            user_lng = this.state.region.longitude,
            R = 6371,
            dLat = (user_lat-station_lat) * Math.PI / 180,
            dLon = (user_lng-station_lng) * Math.PI / 180,
            station_lat = (station_lat) * Math.PI / 180,
            user_lat = (user_lat) * Math.PI / 180;

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(station_lat) * Math.cos(user_lat);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return (R * c) * 1000;
    }

    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({region: position.coords})
        },
        (error) => alert('ERROR : ' + JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
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
                <Text>{ rowData.distance } meters</Text>
            </TouchableOpacity>
        )
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.fetchStationsList().then(() => {
            this.setState({refreshing: false});
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Longitude : {this.state.region.longitude}</Text>
        <Text>Latitude : {this.state.region.latitude}</Text>
        <MapView
            region={this.state.region}
            style={{
              width: width,
              height: 150,
            }}
          />
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              refreshControl={
                <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh.bind(this)}
                />
              }
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
    paddingTop:70,
  },
  item: {
    backgroundColor: '#fbfbfb',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
  bold: {
      fontWeight: 'bold'
  }
});
