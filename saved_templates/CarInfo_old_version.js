import React, { Component } from 'react';


import React, { Component } from 'react';
import { View, Button, Image, Text, Picker, StyleSheet, ListView } from 'react-native'

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

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
    componentDidMount() {
    return fetch('https://driveguard.herokuapp.com/position')
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



   state = {weather: 'Sun',
           // speed: 100,
            fuel: 30,
            destination: 20,
       //     initialPosition: 'unknown',
     //       lastPosition: 'unknown',
    //        lat: 0,
      //      long: 0
            }

   updateUser = (weather) => {
      this.setState({ weather: weather })
   }

   toggleSwitch = (value) => this.setState({ switchValue: value })


   render() {
          let url = 'https://driveguard.herokuapp.com/position';

    getJSON(url, function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    this.state.speed = data.Speed
    //alert('Your query count: ' + kek);
  }
}); 
      var speed = parseFloat(state.speed);

      return (
        <View style = {styles.container}>
          <Text style={styles.item}>Speed: {speed} km/h</Text>
          <Text style={styles.item}>Fuel left:  {this.state.fuel} l  </Text>
          <Text style={styles.item}>Till dest:  {this.state.destination} km  </Text>

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

