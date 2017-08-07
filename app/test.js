import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

state = {lat: 0,
        long: 0}

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://driveguard.herokuapp.com/future_events/')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Latitude),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    let url = 'https://driveguard.herokuapp.com/future_events/';

    getJSON(url, function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    this.state.lat = data.Latitude
    this.state.long = data.Longitude
    //alert('Your query count: ' + kek);
  }
}); 
      var lat = parseFloat(state.lat);
      var long = parseFloat(state.long);


    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return ( 
      <View style={{flex: 1, paddingTop: 20}}>
      <Text>Latitude {lat}  </Text>
      <Text>Longitude {long}  </Text>
      


        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        />


      </View>


    );
  }
}
