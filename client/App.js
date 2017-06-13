import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Question from "./Question";

export default class App extends React.Component {
  state = {
    questions: [],
    question: ""
  };

  componentWillMount() {
    fetch("http://demo0233982.mockable.io/questions")
      .then(resp => resp.json())
      .then(({ questions }) => {
        this.setState({
          questions
        });
      });
  }

  onChange = question => this.setState({ question });

  render() {
    const { question, questions } = this.state;
    return (
      <View style={styles.container}>
        <TextInput value={question} onChange={this.onChange} />
        <View>
          {questions.map(q => <Question key={q.question} question={q} />)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
