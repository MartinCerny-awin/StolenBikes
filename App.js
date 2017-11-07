/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen";
import SearchResults from "./SearchResults";
import SearchScreen from "./SearchScreen";
import ChatScreen from "./ChatScreen";

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  Chat: { screen: ChatScreen },
  SearchResults: { screen: SearchResults }
});

export default class App extends Component<{}> {
  render() {
    return <SimpleApp />;
  }
}
