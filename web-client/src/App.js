import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { BrowserRouter as Router } from "react-router-dom";

import { fetchJson, patchJson, fetchMe, postJson } from "./fetch";
import Routes from "./Routes";
import Register from "./Register";

import { unlockDistanceInterval } from "./config";
import _ from "lodash";
import { getDeviceId } from "./lib/get_device_id";
import styled from "styled-components/native";

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
    return patchJson("/questions", data, deviceID).then(this.fetchQuestions);
  };

  submitAnswer = (questionId, answer) => {
    return postJson("/answers", { id: questionId, answer }, deviceID).then(
      this.fetchAnswers
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
      console.log("Questions", questions);
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
      console.log("Answers", answers);
      this.setState({
        loadingAnswers: false,
        answers
      });
    } catch (err) {
      console.log("err", JSON.stringify(err));
    }
  };

  async componentWillMount() {
    this.refreshData();
    this.loadPersistDistance();

    try {
      const user = await fetchMe(deviceID);
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
      return (
        <SafeContainer>
          <Register style={{ flex: 1 }} setUser={this.setUser} />
        </SafeContainer>
      );
    } else {
      return (
        <SafeContainer style={{ flex: 1 }}>
          <Router>
            <Routes
              props={{
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
          </Router>
        </SafeContainer>
      );
    }
  }
}

const SafeContainer = styled.View`
  flex: 1;
  background-color: #a6d6f0;
  /* Status bar height on iOS 10 */
  padding-top: 20px;
  /* Status bar height on iOS 11.0 */
  padding-top: constant(safe-area-inset-top);
  /* Status bar height on iOS 11+ */
  padding-top: env(safe-area-inset-top);

  padding-bottom: 20px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-top);
`;
