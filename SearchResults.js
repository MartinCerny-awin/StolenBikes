import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text
} from "react-native";
import SearchResult from "./SearchResult";

class ListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.thumb}
              source={
                item.thumb
                  ? { uri: item.thumb }
                  : require("./Resources/noimage.png")
              }
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Search term: ${navigation.state.params.searchString}`
  });

  keyExtractor = (item, index) => index;

  renderItem = ({ item, index }) => (
    <ListItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = index => {
    this.props.navigation.navigate("SearchResult", {
      item: this.props.navigation.state.params.bikes[index]
    });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.bikes}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#dddddd"
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#48BBEC"
  },
  title: {
    fontSize: 20,
    color: "#656565"
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10
  }
});
