import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  View,
  ScrollView,
  LayoutAnimation,
  UIManager
} from "react-native";

import Question from "./Question";

import { primaryColor, unlockDistanceInterval } from "./config";

export default class QuestionList extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: "Upplåsta",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./res/list.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    openKey: null,
    imagesLoaded: false
  };

  componentDidMount() {
    Promise.all([
      Image.prefetch("https://didit.rocks/res/check.png"),
      Image.prefetch("https://didit.rocks/res/quest.png"),
      Image.prefetch("https://didit.rocks/res/lock.png")
    ]).then(() => {
      this.setState({
        imagesLoaded: true
      });
    });
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  setOpen = key => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ openKey: key });
  };

  render() {
    const {
      questions,
      loading: loadingQuestions,
      userId,
      answers,
      submitAnswer,
      unlockCount
    } = this.props.screenProps;
    const { openKey, imagesLoaded } = this.state;

    const getAnswerForQuestionId = qId => (answers[qId] || {})[userId];

    if (loadingQuestions || !imagesLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {questions.map((q, i) =>
          <Question
            onPressHeader={() => this.setOpen(q.id)}
            open={q.id === openKey}
            userAnswer={getAnswerForQuestionId(q.id)}
            unlocked={i < unlockCount}
            key={q.id}
            question={q}
            submitAnswer={submitAnswer}
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 26,
    height: 26
  }
});
