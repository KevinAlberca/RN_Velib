import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import Emoji from 'react-native-emoji';

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

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}><Emoji name="bike"/> Liste des Velibs</Text>
            </View>
        )
    }

  render() {
    return (
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderSectionHeader={this.renderSectionHeader}
              renderRow={(rowData) => <Text>{rowData.name}</Text>}
          />
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
  header: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#F0F0F0',
    height: 60,
    justifyContent: 'space-between'
  },
  headerTitle : {
    textAlign: 'center',
    fontSize: 20,
    color: '#DA552F',
    fontWeight: 'bold'
  },
});
