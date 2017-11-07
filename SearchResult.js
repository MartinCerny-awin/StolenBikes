import React, { Component } from "react";
import { Dimensions, StyleSheet, Image, Text, View } from "react-native";

export default class SearchResult extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.title}`
  });

  state = {
    width: 100,
    height: 100
  };

  componentDidMount() {
    this.props.navigation.state.params.item.large_img
      ? Image.getSize(
          this.props.navigation.state.params.item.large_img,
          (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get("window").height; // or something else
            const maxWidth = Dimensions.get("window").width;

            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({
              width: srcWidth * ratio,
              height: srcHeight * ratio
            });
          },
          error => {
            console.log("error:", error);
          }
        )
      : "";
  }

  colors() {
    return item.frame_colors.map(function(color, i) {
      return (
        <View key={i}>
          <Text>{color}</Text>
        </View>
      );
    });
  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { item } = this.props.navigation.state.params;
    return (
      <View>
        <Image
          style={{ width: this.state.width, height: this.state.height }}
          source={
            item.large_img
              ? { uri: item.large_img }
              : require("./Resources/noimage.png")
          }
        />
        <Text style={styles.text}>Manufacturer: {item.manufacturer_name}</Text>
        <Text style={styles.text}>Frame: {item.frame_model}</Text>
        <Text style={styles.text}>Year: {item.year}</Text>
        <View>
          <Text style={styles.text}>Colours:</Text>
          {item.frame_colors.map(color => (
            <Text key={color} style={styles.smallText}>
              {color}
            </Text>
          ))}
        </View>
        <Text style={styles.text}>Stolen date: {item.date_stolen}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "#383838",
    fontWeight: "bold"
  },
  text: {
    fontSize: 25,
    color: "#656565"
  },
  smallText: {
    fontSize: 15,
    color: "#656565",
    marginLeft: 20
  }
});
