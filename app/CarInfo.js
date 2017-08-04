import React, { Component } from 'react';
import { View, Image, Text, Picker, StyleSheet } from 'react-native'

class CarInfo extends Component {

   state = {weather: 'Sun',
            speed: 100,
            fuel: 30,
            destination: 20,
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            }

   updateUser = (weather) => {
      this.setState({ weather: weather })
   }

   toggleSwitch = (value) => this.setState({ switchValue: value })

   watchID: ?number = null;

   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

      this.watchID = navigator.geolocation.watchPosition((position) => {
         const lastPosition = JSON.stringify(position.coords.speed);
         const Heading = JSON.stringify(position.coords.heading);
         this.setState({ lastPosition });
         this.setState({ Heading });


         var lat = JSON.stringify(position.coords.latitude);  // prepare for JSON
         var long = JSON.stringify(position.coords.longitude);
         this.setState({ lat });
         this.setState({ long });

      });
   }

   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }



   render() {
    var speed = parseFloat(this.state.lastPosition*3.6).toFixed(2);
    if (speed <= 0){
      speed = 0;
    }
    var direction = this.state.Heading;

    var LAT = this.state.lat;
    var LONG = this.state.long; 
    // SENDING TO THE SERVER
    const file = {
           latitude: LAT,             
            longitude: LONG,          
        }

    const body = new FormData()
    body.append('file', file)

// insert objective server URL
    var url = 'https://facebook.github.io/react-native/'

    fetch(url, {
       method: 'POST',
       body
      })

      return (
        <View style = {styles.container}>
          <Text style={styles.item}>Speed: {speed} km/h</Text>
          <Text style={styles.item}>Fuel left:  {this.state.fuel} l  </Text>
          <Text style={styles.item}>Till dest:  {this.state.destination} km  </Text>
          <Text style={styles.item}>Heading: {direction} </Text>

         <View>
            <Text style = {styles.item}>Weather: {this.state.weather}</Text>
            <Picker selectedValue = {this.state.weather} onValueChange = {this.updateUser}>
               <Picker.Item label = "Sun" value = "Sun" />
               <Picker.Item label = "Rain" value = "Rain" />
               <Picker.Item label = "Heavy Rain" value = "Heavy Rain" />
               <Picker.Item label = "Strong Wind" value = "Strong Wind" />
               <Picker.Item label = "Snow" value = "Snow" />
            </Picker>

         </View>
         </View>
      )
   }
}

CarInfo.navigationOptions = {
  title: 'Car Info',
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('./../Images/informationsymbol.png')}
      style={[styles.icon, ]}
    />
  ),
};

export default CarInfo

const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingTop: 22,
      },

     icon : {
          width: 26,
          height: 26,
      },
     item: {
        padding: 10,
        fontSize: 30,
        height: 70,
        color: 'red'
      },
      text: {
          fontSize: 30,
          alignSelf: 'center',
          color: 'red'
       },
})
