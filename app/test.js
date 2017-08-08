import React, { Component } from 'react';
import { ActivityIndicator, TextInput, ListView, Button, Alert, Text, View } from 'react-native';
// import styles from './styles'
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
        long: 0,
        speed: 0,}

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
}

    textInput = {
        lat: '10',
        long: '10',
        speed: '10',
    }

  componentDidMount() {
    return fetch('https://driveguard.herokuapp.com/position/')
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
  testPOST= () => {
    //   alert(this.textInput.lat)
      var http = new XMLHttpRequest();
      var url = "https://driveguard.herokuapp.com/position/";
        var params = "Latitude=53.1666809&Longitude=8.6743724&Speed=100";
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() {//Call a function when the state changes.
        	if(http.readyState == 4 && http.status == 200) {
        		alert(http.responseText);
        	}
        }
        http.send(params);
  }


  _onPressButtonPOST = () => {
      var http = new XMLHttpRequest();
      var url = "https://driveguard.herokuapp.com/position/";
        var params = "Latitude=" + state.lat + "&Longitude=" + state.long + "&Speed=" + state.speed;

        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            //    alert(http.responseText);
          }
        }
        http.send(params);
        alert("Loation and Speed updated")

  };

  _onPressButtonGET = () => {
      fetch('https://driveguard.herokuapp.com/position/', {
        method: 'GET',
    })
    .then((response) => response.json())
     .then((responseJson) => {
       Alert.alert(
           'Buttton Pressed',
           'Result \n' + JSON.stringify(responseJson)
       )
     })
     .catch((error) => {
       console.error(error);
     });

  };


  _handleTextChange = inputValue => {
    this.setState({ inputValue });
    Alert.alert(
      "Text changed",
      "what's the text though"
    )
  };

  loadLatLong() {
      let url = 'https://driveguard.herokuapp.com/position/';
      getJSON(url, function(err, data) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      state.lat = data.Latitude
      state.long = data.Longitude
      state.speed = data.Speed
    }
    });
  }

  render() {
     this.loadLatLong()
      var lat = parseFloat(state.lat);
      var long = parseFloat(state.long);


    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    // <Text>Latitude {lat}  </Text>
    // <Text>Longitude {long}  </Text>
    return (
      <View style={{flex: 1, paddingTop: 20}}>
      <Text style = {{color:'black', fontSize:30, fontWeight: 'bold'}} >
         Enter Latitude:
      </Text>
      <TextInput
            defaultValue = {state.lat}

            maxLength = {3}
            keyboardType = 'numeric'
            onChangeText = {(text) => state.lat = text}
            // value = {this.textInput.lat}
            style = {{width:200, height: 44, padding:8,color:'blue',backgroundColor: '#ded7c1', borderColor: 'black'}}
      />

      <Text style = {{color:'black', fontSize:30, fontWeight: 'bold'}} >
         Enter Longitude:
      </Text>
      <TextInput
            defaultValue = {state.long}

            maxLength = {3}
            keyboardType = 'numeric'
            onChangeText = {(text) => state.long = text}
            // value = {this.textInput.lat}
            style = {{width:200, height: 44, padding:8,color:'blue',backgroundColor: '#ded7c1', borderColor: 'black'}}
      />

      <Text style = {{color:'black', fontSize:30, fontWeight: 'bold'}} >
         Enter Speed:
      </Text>
      <TextInput
            defaultValue = {state.speed}
            maxLength = {3}
            keyboardType = 'numeric'
            onChangeText = {(text) => state.speed = text}
            // value = {this.textInput.lat}
            style = {{width:200, height: 44, padding:8,color:'blue',backgroundColor: '#ded7c1', borderColor: 'black'}}
      />

      <Button
         title="POST position"
         onPress={this._onPressButtonPOST}
       />
       <Button
          title="GET Position"
          onPress={this._onPressButtonGET}
        />
      </View>


    );
  }
}
