import React from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import { Constants } from "expo";

import { fetchJson, fetchMe, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

export default class App extends React.Component {
  state = {
    user: null,
    loading: false,
    questions: []
  };

  submitQuestion = data => {
    return postJson("/questions", data, Constants.deviceId).then(() => {
      this.fetchQuestions();
    });
  };

  setUser = user => this.setState({ user });

  fetchQuestions = () => {
    this.setState({
      loading: true
    });
    fetchJson("/questions").then(questions => {
      this.setState({
        loading: false,
        questions
      });
    });
  };

  getUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      const id = Constants.deviceId;
      const fetchedUser = await fetchMe(id);
      return fetchedUser;
    }
  };

  async componentWillMount() {
    const user = await this.getUser();
    if (user) {
      this.setState({
        user
      });
    }
    this.fetchQuestions();
  }

  render() {
    const { user, questions, loading } = this.state;
    if (!user) {
      return <Register style={styles.container} setUser={this.setUser} />;
    } else {
      return (
        <View style={styles.container}>
          <Routes
            screenProps={{
              submitQuestion: this.submitQuestion,
              loading,
              questions
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});
