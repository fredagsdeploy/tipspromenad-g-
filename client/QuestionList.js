import React from "react";
import { StyleSheet, Text, Image, FlatList } from "react-native";

import Question from "./Question";

export default class AddQuestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: "List",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./list.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  render() {
    const { questions } = this.props.screenProps;

    return (
      <FlatList
        style={styles.container}
        data={questions}
        keyExtractor={q => q.id}
        renderItem={({ item: q, key }) => <Question key={key} question={q} />}
      />
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
