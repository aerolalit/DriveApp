import React, { Component } from 'react'
import { View, Image, Text, Switch, StyleSheet} from 'react-native'

class Settings extends Component {

   state = {
      switchValue: true,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
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
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
   }

   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }

   render() {
      return (
        <View style = {styles.container}>
          <Text style = {styles.item}>Speed </Text>

         <View style = {styles.switch}>
            <Switch onValueChange = {this.toggleSwitch} value = {this.state.switchValue}/>
            <Text style = {styles.text}>{this.state.switchValue ? 'km/h' : 'm/h'}</Text>
         </View>

         <Text style = {styles.item}>
               Current position:
            </Text>

            <Text>
               {this.state.lastPosition}
            </Text>

         </View>
      )
   }
}

Settings.navigationOptions = {
    title:'Settings',
     tabBarIcon:({ tintColor }) => (
         <Image
                source = { require('./../Images/settings.png')}
                style={[styles.icon, ]}
            />
     ),
}

export default Settings

const styles = StyleSheet.create ({
    switch: {
          paddingTop: 10,
          alignItems: 'flex-end',
          marginRight: 20
       },
     boldText: {
          fontSize: 30,
          color: 'red',
       },

    text: {
          fontSize: 30,
          color: 'red',
       },
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
      icon : {
          width: 26,
          height: 26,
      },
})
