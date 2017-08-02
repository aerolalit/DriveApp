/* DriveApp software
* is created by Oleg Borisov and Lalit Singh
* for Objective Gmbh as internship project
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image
} from 'react-native';

//
import NavigationScreen from './app/NavigationScreen'
import CarInfo from './app/CarInfo'
import SettingsScreen from './app/SettingsScreen'

import { TabNavigator } from 'react-navigation';


//
// class Navigation extends Component {
//   static navigationOptions = {
//     title: 'Navigation Screen',
//     tabBarIcon: ({ tintColor }) => (
//       <Image
//         source={require('./Images/Navigation.png')}
//         style={[styles.icon, ]}
//       />
//     ),
//   };
//
//   render(){
//     const { navigation } = this.props;
//
//     return (
//        <NavigationScreen navigation={ navigation }/>
//     );
//   }
// }

const SimpleApp = TabNavigator({
  Home: { screen: NavigationScreen },
  CarInfo: { screen: CarInfo},
  Settings: {screen: SettingsScreen}
});


const styles = StyleSheet.create({
    icon : {
        width: 26,
        height: 26,
    },
});

AppRegistry.registerComponent('DriveApp', () => SimpleApp);
