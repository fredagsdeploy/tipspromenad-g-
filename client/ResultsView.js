import React from "react";
import {
  StyleSheet,
  TextInput,
  RefreshControl,
  Image,
  View,
  ScrollView
} from "react-native";

import TPText from "./TPText";
import TPHeader from "./TPHeader";
import QuestionResult from "./QuestionResult.js";

import _ from "lodash";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

export default class ResultView extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Resultat",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./res/result.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = { openKey: null };

  generateLeaderboard = (questions, answers) => {
    if (!answers) {
      return [];
    }

    const addPointToUser = (acc, userId) => {
      return { ...acc, [userId]: (acc[userId] || 0) + 1 };
    };

    const isCorrectAnswer = (question, userAnswer) => {
      return question.alternatives[question.correctAlternative] === userAnswer;
    };

    return _.chain(questions)
      .reduce((acc, question) => {
        const currentQuestionUserAnswers = answers[question.id];
        if (
          question.correctAlternative === null ||
          !currentQuestionUserAnswers
        ) {
          // Question cannot be processed. No correct alternative set or no one has answered it yet.
          return acc;
        }

        // Give points to users for the current question if answered correctly
        return _.reduce(
          currentQuestionUserAnswers,
          (acc, answer, userId) => {
            if (isCorrectAnswer(question, answer)) {
              return addPointToUser(acc, userId);
            }
            return acc;
          },
          acc
        );
      }, {})
      .toPairs()
      .map(([nick, points]) => ({ nick, points }))
      .orderBy(["points"], ["desc"])
      .value();
  };

  onPressQuestionResultHeader = questionId => {
    console.log("Press header", questionId);
    this.setState({
      openKey: questionId
    });
  };

  renderDone = () => {
    const { openKey } = this.state;
    const { questions, answers } = this.props.screenProps;
    const leaderBoard = this.generateLeaderboard(questions, answers);
    return (
      <View style={{ marginLeft: 20 }}>
        <TPHeader>Vem var gôrbra?</TPHeader>
        <View style={styles.scoreTableContainer}>
          {leaderBoard.map(({ nick, points }) => {
            return (
              <View style={styles.scoreTableRow} key={nick}>
                <TPText style={styles.scoreTablePointsCell}>{points}</TPText>
                <TPText style={styles.scoreTableNameCell}>{nick}</TPText>
              </View>
            );
          })}
        </View>

        <TPHeader>Resultat per fråga</TPHeader>
        <View style={styles.scoreTableContainer}>
          {questions.map((q, index) => {
            return (
              <QuestionResult
                key={q.id}
                question={q}
                open={q.id === openKey}
                onPressHeader={this.onPressQuestionResultHeader}
                userAnswers={answers[q.id]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  renderNotDone = () => {
    return (
      <View style={{ marginLeft: 20 }}>
        <TPHeader>Väntar på resultat...</TPHeader>
      </View>
    );
  };

  render() {
    const {
      questions,
      appModeDone,
      answers,
      loading,
      refreshData
    } = this.props.screenProps;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
      >
        {appModeDone ? this.renderDone() : this.renderNotDone()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContainer: {
    paddingBottom: 50
  },
  textInput: {
    marginTop: 20,
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "#000"
  },
  icon: {
    width: 26,
    height: 26
  },
  error: {
    marginTop: 10,
    color: "tomato"
  },
  scoreTableContainer: {
    flex: 1,
    marginBottom: 20
  },
  scoreTableRow: {
    flexDirection: "row",
    marginTop: 10
  },
  scoreTableNameCell: {
    fontSize: 18,
    marginLeft: 10
  },
  scoreTablePointsCell: {
    fontSize: 18,
    marginRight: 10
  }
});
