import React from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import { Constants } from "expo";

import { fetchJson, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

export default class App extends React.Component {
  state = {
    user: null,
    questions: []
  };

  createUser = nick => {
    postJson("/users", { nick, id: Constants.deviceId }).then(user => {
      AsyncStorage.setItem("user", JSON.stringify(user));
      this.setState({ user });
    });
  };

  submitQuestion = data => {
    const { user } = this.state;
    postJson("/questions", data, user && user.id)
      .then(() => {
        this.fetchQuestions();
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  fetchQuestions = () => {
    fetchJson("/questions").then(questions => {
      this.setState({
        questions
      });
    });
  };

  async componentWillMount() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      this.setState({
        user: JSON.parse(user)
      });
    }
    this.fetchQuestions();
  }

  render() {
    const { user, questions } = this.state;
    if (!user) {
      return <Register onSubmit={this.createUser} />;
    } else {
      return (
        <Routes
          style={styles.container}
          screenProps={{ submitQuestion: this.submitQuestion, questions }}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});
