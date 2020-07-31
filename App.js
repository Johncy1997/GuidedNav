/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {
  View
} from 'react-native';
import {Provider} from 'react-redux';
import Store from './guidednav/store';
import AppContainer from './guidednav/navigators';
import { NavigationContainer } from '@react-navigation/native';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.disableYellowBox = true;
    console.ignoredYellowBox=true;
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <AppContainer ref={nav => (this.primaryNavigator = nav)} />
          </View>
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;
