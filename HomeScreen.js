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
        <Text style={styles.instructions}>Search for houses to buy!</Text>
        <Text style={styles.instructions}>
          Search by place-name or postcode.
        </Text>
        <Button
          onPress={() => navigate("Chat", { user: "Martin" })}
          title="You can still chat with Lucy"
        />
        <Button
          onPress={() => navigate("Search")}
          title="Search for properties"
        />
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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 20
  }
});
