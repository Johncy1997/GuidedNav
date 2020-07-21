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
      <NavigationContainer>
      <View style={{ flex: 1 }}>
        <AppContainer ref={nav => (this.primaryNavigator = nav)} />
      </View>
      </NavigationContainer>
    );
  }
};

export default App;
