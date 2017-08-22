import React, { Component } from 'react';
import { ActivityIndicator, Picker, TextInput, ListView, Button, Alert, Text, View } from 'react-native';
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
        radius: 0,
        type: '',
    }

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
}


  componentDidMount() {
    return fetch('https://driveguard.herokuapp.com/api/future_events/')
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

  _onPressButtonPOST = () => {
      var http = new XMLHttpRequest();
      var url = "https://driveguard.herokuapp.com/api/future_events/";
        var params = "Latitude=" + state.lat + "&Longitude=" + state.long + "&Radius=" + state.radius + "&Type=" + state.type;

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
        alert("Future_events posted")

  };

  _onPressButtonGET = () => {
      fetch('https://driveguard.herokuapp.com/api/future_events/', {
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
      let url = 'https://driveguard.herokuapp.com/api/future_events/';
      getJSON(url, function(err, data) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      state.lat = data.Latitude
      state.long = data.Longitude
      state.radius = data.Radius
      state.type = data.Type
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
         Enter Radius:
      </Text>

      <TextInput
            defaultValue = {state.radius}
            maxLength = {3}
            keyboardType = 'numeric'
            onChangeText = {(text) => state.radius = text}
            // value = {this.textInput.lat}
            style = {{width:200, height: 44, padding:8,color:'blue',backgroundColor: '#ded7c1', borderColor: 'black'}}
      />


        <Picker
          onValueChange= {(itemValue) => state.type = itemValue}
          selectedValue={state.type}
        >
          <Picker.Item label="Sunny" value="Sunny" />
          <Picker.Item label="Rain" value="Rain" />
          <Picker.Item label="Strom" value="Strom" />
          <Picker.Item label="Tsunami" value="Tsunami" />
          <Picker.Item label="Snow" value= "Snow" />
          <Picker.Item label = "Heavy Rain" value = "Heavy Rain" />
        </Picker>

        <Button
           title="POST Event"
           onPress={this._onPressButtonPOST}
         />
         <Button
            title="GET Event"
            onPress={this._onPressButtonGET}
          />
      </View>


    );
  }
}
