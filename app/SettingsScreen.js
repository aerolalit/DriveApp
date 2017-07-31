import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
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
})

const SettingsScreen = (props)  => {
  const { navigate } = props.navigation;

  return (
      <View style={styles.container}>
          <Text style={styles.item}>Format of speed</Text>
                    <Text style={styles.item}>Language</Text>
                              <Text style={styles.item}>etc</Text>


      </View>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen