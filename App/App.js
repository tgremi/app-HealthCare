/**
 * Author: Thalles W. Gremi
 * https://github.com/tgremi
 * thallesgremi@gmail.com
 * 
 */

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import NavigationService from './NavigationService';
import { AsyncStorage } from 'react-native';
import Routes from './config/routes'

import getStore from './store'
import { addListener } from './store'

const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
})

const navReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state)
  console.log(newState)
  return newState || state
}

class App extends Component {
  componentDidMount = () => {
    // AsyncStorage.clear(); 
    
    this._initialLoadState().done();
  }

  _initialLoadState = async () => {
    let value = await AsyncStorage.getItem('route');
    if (value !== null) {
      NavigationService.navigate(value)
    }
  }

  render() {
    return (
      <Navigator
        ref={navigatorRef => {
          NavigationService.setContainer(navigatorRef);
        }}
        // navigation={addNavigationHelpers({
        //  })}
        dispatch={this.props.dispatch}
        state={this.props.nav}
        addListener

      />
    )
  }
}

const store = getStore(navReducer);
const AppIndex = connect(state => (console.log(state), { nav: state.nav }))(App)

export default Index = () => {
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  )
}