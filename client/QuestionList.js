import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  View,
  ScrollView
} from "react-native";

import Question from "./Question";

import { primaryColor, unlockDistanceInterval } from "./config";

export default class QuestionList extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Upplåsta",
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
    const { questions, loading } = this.props.screenProps;
    const { openKey } = this.state;
    const unlockCount = Math.floor(
      this.props.screenProps.distance / unlockDistanceInterval
    );

    if (loading) {
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
            unlocked={i < unlockCount}
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
