import React, { Component } from "react";
import { Platform, Button, StyleSheet, Text, View } from "react-native";

const instructions = Platform.select({
  ios: "iOS user? What about trying something better?",
  android: "You are using Android! Rock you!"
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Search for stole bikes</Text>
        <Text style={styles.text}>Search by model or manufacturer.</Text>
        <Button onPress={() => navigate("Search")} title="Search for bikes" />
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  instructions: {
    marginTop: 100
  }
});
