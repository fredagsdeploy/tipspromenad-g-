import React from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";

import { fetchJson, patchJson, fetchMe, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

import { unlockDistanceInterval } from "./config";
import _ from "lodash";
import { getDeviceId } from "./lib/get_device_id";

const deviceID = getDeviceId();

export default class App extends React.Component {
  state = {
    user: null,
    loadingQuestions: false,
    loadingAnswers: false,
    loadingAppmode: false,
    questions: [],
    appMode: "NORMAL",
    answers: {},
    distance: 0
  };

  submitQuestion = data => {
    return postJson("/questions", data, deviceID).then(() => {
      this.fetchQuestions();
    });
  };

  updateQuestion = data => {
    return patchJson("/questions", data, deviceID).then(() => {
      this.fetchQuestions();
    });
  };

  submitAnswer = (questionId, answer) => {
    return postJson("/answers", { id: questionId, answer }, deviceID).then(
      () => {
        this.fetchAnswers();
      }
    );
  };

  fetchAppMode = () => {
    fetchJson("/appmode").then(({ appMode }) => {
      this.setState({ appMode, loadingAppmode: false });
    });
  };

  refreshData = () => {
    this.setState({
      loadingQuestions: true,
      loadingAnswers: true,
      loadingAppmode: true
    });
    this.fetchAppMode();
    this.fetchQuestions();
    this.fetchAnswers();
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

  clearDistance = () => {
    this.setState({
      distance: 0
    });
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
        loadingQuestions: false,
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
        loadingAnswers: false,
        answers
      });
    } catch (err) {
      console.log("err", JSON.stringify(err));
    }
  };

  getUser = () => fetchMe(deviceID);

  async componentWillMount() {
    this.refreshData();
    this.loadPersistDistance();

    try {
      const user = await this.getUser();
      if (user) {
        this.setState({
          user
        });
      }
    } catch (e) {
      console.log("could not load user");
      console.log(e);
      this.clearDistance();
    }
  }

  render() {
    const {
      user,
      questions,
      answers,
      loadingQuestions,
      loadingAnswers,
      loadingAppmode,
      distance,
      appMode
    } = this.state;
    if (!user) {
      return <Register style={styles.container} setUser={this.setUser} />;
    } else {
      return (
        <View style={styles.container}>
          <Routes
            screenProps={{
              submitQuestion: this.submitQuestion,
              refreshData: this.refreshData,
              updateQuestion: this.updateQuestion,
              loading: loadingQuestions || loadingAnswers || loadingAppmode,
              answers,
              questions,
              distance,
              appModeDone: appMode === "DONE",
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
    flex: 1
  }
});
