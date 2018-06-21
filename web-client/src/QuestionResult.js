import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { primaryColor, selectColor } from "./config";
import TPText from "./TPText";

export default class QuestionResult extends React.PureComponent {
  getCorrectUsers = (question, userAnswers) => {
    const isCorrect = (user, question) =>
      question.alternatives[question.correctAlternative] === userAnswers[user];

    let correctUsers = [];
    for (const user in userAnswers) {
      if (isCorrect(user, question)) {
        correctUsers.push(user);
      }
    }
    console.log("correctUsers", correctUsers);
    return correctUsers;
  };

  render() {
    const { question, userAnswers, open, onPressHeader } = this.props;

    const correctUsers = this.getCorrectUsers(question, userAnswers);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressHeader(question.id)}>
          <View>
            <TPText style={styles.prefix}>{question.question}</TPText>
          </View>
        </TouchableOpacity>

        <View style={styles.subContainer}>
          {open && (
            <View>
              <TPText style={styles.greenText}>
                Antal rätt: {correctUsers.length}
              </TPText>
              <View style={styles.namesContainer}>
                {correctUsers.map(user => {
                  return (
                    <TPText key={user} style={styles.name}>
                      {user}
                    </TPText>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
    marginTop: 10,
    justifyContent: "center"
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center"
  },
  namesContainer: {
    marginHorizontal: 10,
    flexDirection: "row"
  },
  name: {
    marginRight: 6
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: primaryColor
  },
  greenText: {
    color: selectColor
  },
  prefix: {
    fontSize: 18,
    fontWeight: "900",
    color: primaryColor
  },
  headerContainer: {
    flexDirection: "row",
    marginRight: 20
  }
});
