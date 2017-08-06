/* DriveApp software
* is created by Oleg Borisov and Lalit Singh
* for Objective Gmbh as internship project
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
} from 'react-native';

//
import NavigationScreen from './app/NavigationScreen'
import CarInfo from './app/CarInfo'
import SettingsScreen from './app/SettingsScreen'
import TestScreen from './app/test'

import { TabNavigator } from 'react-navigation';

const SimpleApp = TabNavigator({
   Test: { screen: TestScreen },
  NavigationScreen: { screen: NavigationScreen},
  CarInfo: { screen: CarInfo},
  Settings: {screen: SettingsScreen},
});

AppRegistry.registerComponent('DriveApp', () => SimpleApp);
