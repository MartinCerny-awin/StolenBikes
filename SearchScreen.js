import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Image,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SearchResults from "./SearchResults";

function urlForQueryAndPage(key, value) {
  const data = {
    per_page: "15",
    page: 1
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join("&");

  return "https://bikeindex.org:443/api/v3/search?" + querystring;
}

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Search for properties!"
  });

  constructor(props) {
    super(props);
    this.state = {
      searchString: "Author",
      isLoading: false,
      message: ""
    };
  }

  executeQuery = query => {
    this.setState({ isLoading: true });

    fetch(query)
      .then(bikes => bikes.json())
      .then(json => this.handleResponse(json.bikes))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: "Something bad happened " + error
        });
      });
  };

  onSearchPressed = () => {
    Keyboard.dismiss();
    const query = urlForQueryAndPage("manufacturer", this.state.searchString);

    this.executeQuery(query);
  };

  onSearchTextChanged = event => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  handleResponse = bikes => {
    this.setState({ isLoading: false, message: "" });
    if (bikes.length > 0) {
      this.props.navigation.navigate("SearchResults", {
        bikes
      });
    } else {
      this.setState({
        message:
          "You are lucky! No bike with this name has been stolen. Try again."
      });
    }
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.flowRight}>
            <TextInput
              style={styles.searchInput}
              value={this.state.searchString}
              onChange={this.onSearchTextChanged}
              placeholder="Search via name or postcode"
            />
            <Button onPress={this.onSearchPressed} color="#48BBEC" title="Go" />
          </View>
          <Image
            source={require("./Resources/bike.png")}
            style={styles.image}
          />
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
        </View>
      </TouchableWithoutFeedback>
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
  flowRight: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch"
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48BBEC",
    borderRadius: 8,
    color: "#48BBEC"
  },
  image: {
    width: 217,
    height: 138
  }
});
