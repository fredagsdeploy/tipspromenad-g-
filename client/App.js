import React from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import { Constants } from "expo";

import { fetchJson, fetchMe, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

import _ from "lodash";

export default class App extends React.Component {
  state = {
    user: null,
    loading: false,
    questions: [],
    distance: 0
  };

  submitQuestion = data => {
    return postJson("/questions", data, Constants.deviceId).then(() => {
      this.fetchQuestions();
    });
  };

  submitAnswer = (questionId, answer) => {
    return postJson(
      "/answers",
      { id: questionId, answer },
      Constants.deviceId
    ).then(() => {
      this.fetchQuestions();
    });
  };

  setDistance = distance => {
    this.setState({ distance });
    _.throttle(this.persistDistance, 1000);
  };

  persistDistance = () => {
    try {
      AsyncStorage.setItem("distance", this.state.distance);
    } catch (err) {
      console.error("Could not store distance in persistance storage.", err);
    }
  };

  loadPersistDistance = async () => {
    try {
      const distance = await AsyncStorage.getItem("distance");
      if (distance !== null) {
        this.setState({
          distance
        });
      }
    } catch (err) {
      console.log("No previous distance. Starting from 0");
    }
  };

  setUser = user => this.setState({ user });

  fetchQuestions = () => {
    this.setState({
      loading: true
    });
    fetchJson("/questions")
      .then(questions => {
        console.log("questions", questions);
        this.setState({
          loading: false,
          questions
        });
      })
      .catch(err => {
        console.log("err", JSON.stringify(err));
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
    this.loadPersistDistance();
    if (user) {
      this.setState({
        user
      });
    }
    this.fetchQuestions();
  }

  render() {
    const { user, questions, loading, distance } = this.state;
    if (!user) {
      return <Register style={styles.container} setUser={this.setUser} />;
    } else {
      return (
        <View style={styles.container}>
          <Routes
            screenProps={{
              submitQuestion: this.submitQuestion,
              loading,
              questions,
              distance,
              setDistance: this.setDistance,
              submitAnswer: this.submitAnswer
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
