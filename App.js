import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import Update from "./Screens/Update";
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './Navigation/StackNavigation' ;


export default class App extends Component {
  render() {
    return (
     <NavigationContainer>
      <StackNavigation />
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }
});
