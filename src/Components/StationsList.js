import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderHeader={() => <Text style={styles.header}>Liste de Velib</Text>}
              renderRow={(rowData) => <Text>{rowData.name}</Text>}
          />
        <Text style={styles.welcome}>
          Welcome to React !
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js or index.android.js
        </Text>
      </View>
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
