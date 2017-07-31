/* DriveApp software
* is created by Oleg Borisov and Lalit Singh
* for Objective Gmbh as internship project
*/

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import NavigationScreen from './app/NavigationScreen'
import CarInfo from './app/CarInfo'
import SettingsScreen from './app/SettingsScreen'

import { TabNavigator } from 'react-navigation';

class reactNavigationSample extends Component {
  static navigationOptions = {
    title: 'Navigation Screen',
  };

  render(){
    const { navigation } = this.props;

    return (
      <NavigationScreen navigation={ navigation }/>
    );
  }
}

const SimpleApp = TabNavigator({
  Home: { screen: reactNavigationSample },
  CarInfo: { screen: CarInfo},
  Settings: {screen: SettingsScreen}
});

AppRegistry.registerComponent('DriveApp', () => SimpleApp);