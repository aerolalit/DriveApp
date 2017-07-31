import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Picker,
  TouchableOpacity,
  Alert
} from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 40,
    height: 90,
    color: 'red'
  },
  text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})

state = {
  speed: 100, // goal: connect it to a car
  fuel: 30, // goal: connect it to a car
  destination: 20, // goal: connect it to a car
  weather: 'Sun', // make onPress, such that user can choose the weather cond 
                // manually, suggestion: use a "Picker", or buttons
                // weather options: Sun, Rain, Snow,...
}





const CarInfo = (props)  => {
  const { navigate } = props.navigation;
updateState = () => this.setState({ weatzher: 'The state is updated' })


  return (
      <View style={styles.container}>
          <View style={{backgroundColor:'white'}}>
            <Text style={styles.item}>Speed:  {state.speed} km/h</Text>
          </View>
            <Text style={styles.item}>Fuel left:  {state.fuel} l  </Text>
            <Text style={styles.item}>Till dest:  {state.destination} km  </Text>
            <Text style={styles.item}>Weather:  {state.weather}  </Text>


            <View>
            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
               <Picker.Item label = "Sun" value = "steve" />
               <Picker.Item label = "Rain" value = "ellen" />
               <Picker.Item label = "Snow" value = "maria" />
            </Picker>
            <Text style = {styles.text}>{this.state.user}</Text>
         </View>

            <Button
                onPress={this.updateState}
                title = "Sun"
                color = "red"
                  />
                <Button
                onPress={this.updateState}
                title = "Snow"
                color = "red"
                  />
                  <Button
                onPress={this.updateState}
                title = "Rain"
                color = "red"
                  />


         
   

      </View>
  );
}

CarInfo.navigationOptions = {
  title: 'Car Info',
};

export default CarInfo