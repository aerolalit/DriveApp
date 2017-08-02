import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 70,
    position: 'absolute'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class NavigationScreen extends Component {
   constructor(props){
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    markerPosition: {
      latitude: 0,
      longitude: 0
    }
  }

  watchID: ?number = null

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA

      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})


    }, 
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})


    this.watchID = navigator.geoocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
}
    componentWillUnmount(){
      navigator.geoocation.clearWatch(this.watchID)
    }



  render(){
      return(
        <View style = {styles.container}>
          <MapView 
            style = {styles.map}
            initialRegion = {this.state.initialPosition}>

          <MapView.Marker
            coordinate = {this.state.markerPosition}>
            <View style = {styles.radius}>
              <View style = {styles.marker}>
              </View>
            </View>

          </MapView.Marker>
          </MapView>
        </View>
        );

  }



}

export default NavigationScreen

