import React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";

export default class AddQuestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Add",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./plus.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    question: ""
  };

  onChange = question => this.setState({ question });

  render() {
    const { question, questions } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={this.onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  input: {
    height: 20,
    borderColor: "gray",
    borderWidth: 1
  },
  icon: {
    width: 26,
    height: 26
  }
});
