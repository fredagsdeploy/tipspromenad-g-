import React from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";

import Question from "./Question";

export default class QuestionList extends React.Component {
  static navigationOptions = {
    tabBarLabel: "List",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./list.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    openKey: null
  };

  setOpen = key => {
    this.setState({ openKey: key });
  };

  render() {
    const { questions } = this.props.screenProps;
    const { openKey } = this.state;

    return (
      <ScrollView style={styles.container}>
        {questions.map(q =>
          <Question
            onPressHeader={() => this.setOpen(q.id)}
            open={q.id === openKey}
            key={q.id}
            question={q}
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
