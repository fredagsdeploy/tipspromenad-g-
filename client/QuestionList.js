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

import { primaryColor } from "./config";

export default class QuestionList extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Upplåsta",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./list.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  getUnlockedCount = () => Math.floor(this.props.screenProps.distance / 50);

  state = {
    openKey: null,
    unlockCount: this.getUnlockedCount()
  };

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("Component will update, new distance", nextProps.screenProps.distance);
  //   this.setState({
  //     unlockCount: this.getUnlockedCount()
  //   });
  // }

  setOpen = key => {
    this.setState({ openKey: key });
  };

  render() {
    const { questions, loading } = this.props.screenProps;
    const { openKey, unlockCount } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    console.log("unlockedCount: ", unlockCount);
    return (
      <ScrollView style={styles.container}>
        {questions
          .slice(0, unlockCount)
          .map(q =>
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
