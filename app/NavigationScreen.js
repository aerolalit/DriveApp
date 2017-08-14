import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ListView,
  ActivityIndicator
} from 'react-native';

import MapView from 'react-native-maps';


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
  map: {
    flex: 1,
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  radius:{
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  marker:{
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  icon : {
        width: 26,
        height: 26,
    },

});

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

state = {lat: null,
        long: null,
          speed: null}


class NavigationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
   componentDidMount() {
    return fetch('https://driveguard.herokuapp.com/api/position/')
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


  render(){

 let url = 'https://driveguard.herokuapp.com/api/position/';

    getJSON(url, function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    this.state.lat = data.Latitude
    this.state.long = data.Longitude
    this.state.speed = data.Speed
    //alert('Your query count: ' + kek);
  }
});
  if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

      var lat = parseFloat(state.lat);
      var long = parseFloat(state.long);
      var speed = parseFloat(state.speed)
  return (
    <View style={styles.container}>

      <MapView
      style = {styles.map}
        region={{
         latitude: lat,
         longitude: long,
         latitudeDelta: 0.2922/4,
         longitudeDelta: 0.0421/4,
       }}>
       <MapView.Marker
          coordinate = {{
              latitude: lat,
              longitude: long,
          }}>
          <View style = {styles.radius}>
            <View style = {styles.marker}>
            </View>
            </View>


        </MapView.Marker>
          <View style ={{paddingTop:0,backgroundColor: 'rgba(240, 48, 144, 0.5)' }}>
            <Text style ={{textAlign: 'center'}}>Latitude {lat}  </Text>
           <Text style ={{textAlign: 'center'}}>Longitude {long}  </Text>
           <Text style ={{textAlign: 'center'}}>Speed {speed}  km/h </Text>
        </View>


      </MapView>

    </View>
  );
}
}
NavigationScreen.navigationOptions = {
    title: 'Navigation Screen',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./../Images/Navigation.png')}
        style={[styles.icon, ]}
      />
  )
};

export default NavigationScreen
