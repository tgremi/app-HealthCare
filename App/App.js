/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Components/HomeScreen';
import { NativeRouter, Route } from 'react-router-native';
import LoginScreen from './Components/LoginScreen'
import RegisterScreen from './Components/RegisterScreen'
import { StackNavigator } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: false
    }),

  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: false
    }),

  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      header: false
    }),

  },
},
  {
    initialRouteName: 'Home',
  },
  { headerMode: 'none' },

);


export default class App extends Component<Props> {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
