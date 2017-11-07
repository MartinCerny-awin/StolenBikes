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

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    page: "uk",
    pretty: "1",
    encoding: "json",
    listing_type: "buy",
    action: "search_listings",
    page: pageNumber
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join("&");

  return "https://api.nestoria.co.uk/api?" + querystring;
}

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Search for properties!"
  });

  constructor(props) {
    super(props);
    this.state = {
      searchString: "london",
      isLoading: false,
      message: ""
    };
  }

  executeQuery = query => {
    this.setState({ isLoading: true });

    fetch(query)
      .then(response => response.json())
      .then(json => this.handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: "Something bad happened " + error
        })
      );
  };

  onSearchPressed = () => {
    Keyboard.dismiss();
    const query = urlForQueryAndPage("place_name", this.state.searchString, 1);
    this.executeQuery(query);
  };

  onSearchTextChanged = event => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  handleResponse = response => {
    this.setState({ isLoading: false, message: "" });
    if (response.application_response_code.substr(0, 1) === "1") {
      console.log(response.listings);
      this.props.navigation.navigate("SearchResults", {
        listings: response.listings
      });
    } else {
      this.setState({ message: "Location not recognized; please try again." });
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
            source={require("./Resources/house.png")}
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
