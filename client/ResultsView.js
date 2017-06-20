import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  ScrollView
} from "react-native";
import Button from "./Button";

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

  state = {};

  generateLeaderboard = (questions, answers) => {
    if (!answers) {
      return [];
    }

    const addPointToUser = (acc, userId) => {
      if (!(userId in acc)) {
        acc[userId] = 0;
      }
      acc[userId] += 1;
    };

    const isCorrectAnswer = (question, userAnswer) => {
      return question.alternatives[question.correctAlternative] === userAnswer;
    };

    return _.chain(questions)
      .reduce((acc, question, questionId) => {
        const currentQuestionUserAnswers = answers[question.id];
        if (
          question.correctAlternative === null ||
          !currentQuestionUserAnswers
        ) {
          // Question cannot be processed. No correct alternative set or no one has answered it yet.
          return acc;
        }

        for (let userId in currentQuestionUserAnswers) {
          if (isCorrectAnswer(question, currentQuestionUserAnswers[userId])) {
            addPointToUser(acc, userId);
          }
        }
        return acc;
      }, {})
      .toPairs()
      .sortBy(pair => pair[1])
      .value();
  };

  render() {
    const { questions, answers } = this.props.screenProps;
    const leaderBoard = this.generateLeaderboard(questions, answers);

    return (
      <ScrollView style={styles.container}>
        <Center>
          <Text style={styles.header}>Vem var gôrbra?</Text>
          <View style={styles.scoreTableContainer}>
            {leaderBoard.map((item, index) => {
              return (
                <View style={styles.scoreTableRow} key={index}>
                  <Text style={styles.scoreTableNameCell}>{item[0]}</Text>
                  <Text style={styles.scoreTablePointsCell}>{item[1]}</Text>
                </View>
              );
            })}
          </View>

        </Center>
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
  header: {
    fontSize: 20,
    padding: 5
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
    flex: 1
  },
  scoreTableRow: {
    flexDirection: "row"
  },
  scoreTableNameCell: {
    fontSize: 26,
    marginRight: 10
  },
  scoreTablePointsCell: {
    fontSize: 26,
    marginLeft: 10
  }
});
