import React from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import { Constants } from "expo";

import { fetchJson, patchJson, fetchMe, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

import { unlockDistanceInterval } from "./config";
import _ from "lodash";

export default class App extends React.Component {
  state = {
    user: null,
    loading: false,
    questions: [],
    answers: {},
    distance: 0
  };

  submitQuestion = data => {
    return postJson("/questions", data, Constants.deviceId).then(() => {
      this.fetchQuestions();
    });
  };

  updateQuestion = data => {
    return patchJson("/questions", data, Constants.deviceId).then(() => {
      this.fetchQuestions();
    });
  };

  submitAnswer = (questionId, answer) => {
    return postJson(
      "/answers",
      { id: questionId, answer },
      Constants.deviceId
    ).then(() => {
      this.fetchAnswers();
    });
  };

  setDistance = distance => {
    this.setState({ distance }, _.throttle(this.persistDistance, 1000));
  };

  persistDistance = () => {
    try {
      AsyncStorage.setItem("distance", this.state.distance + "");
    } catch (err) {
      console.log("Could not store distance in persistance storage.", err);
    }
  };

  loadPersistDistance = async () => {
    try {
      const distance = await AsyncStorage.getItem("distance");
      if (distance !== null) {
        this.setState({
          distance: parseInt(distance, 10)
        });
      } else {
        console.log("No previous distance. Starting from 0");
      }
    } catch (err) {
      console.log("Couldn't load persisted distance", err);
    }
  };

  setUser = user => this.setState({ user });

  fetchQuestions = async () => {
    try {
      const questions = await fetchJson("/questions");
      this.setState({
        loading: false,
        questions
      });
    } catch (err) {
      console.log("err", JSON.stringify(err));
    }
  };

  fetchAnswers = async () => {
    try {
      const answers = await fetchJson("/answers");
      this.setState({
        answers
      });
    } catch (err) {
      console.log("err", JSON.stringify(err));
    }
  };

  getUser = () => fetchMe(Constants.deviceId);

  async componentWillMount() {
    this.setState({
      loading: true
    });
    this.fetchQuestions();
    this.fetchAnswers();
    this.loadPersistDistance();

    try {
      const user = await this.getUser();
      console.log("GetUser resp", user);
      if (user) {
        this.setState({
          user
        });
      }
    } catch (e) {
      console.log("could not load user", e);
    }
  }

  render() {
    const { user, questions, answers, loading, distance } = this.state;
    console.log("user in render", user);
    if (!user) {
      return <Register style={styles.container} setUser={this.setUser} />;
    } else {
      return (
        <View style={styles.container}>
          <Routes
            screenProps={{
              submitQuestion: this.submitQuestion,
              fetchQuestions: this.fetchQuestions,
              updateQuestion: this.updateQuestion,
              loading,
              answers,
              questions,
              distance,
              userId: user.nick,
              setDistance: this.setDistance,
              submitAnswer: this.submitAnswer,
              unlockCount: Math.min(
                Math.floor(distance / unlockDistanceInterval),
                questions.length
              )
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
