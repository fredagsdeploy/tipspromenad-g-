import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View
} from "react-native";

import { primaryColor, selectColor } from "./config";

const PREFIX = ["1", "X", "2"];

export default class Question extends React.PureComponent {
  render() {
    const {
      open,
      question,
      userAnswer,
      unlocked,
      onPressHeader,
      submitAnswer
    } = this.props;

    if (!unlocked) {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Image source={require("./res/lock.png")} style={styles.icon} />
            <Text style={styles.header}>Låst</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressHeader}>
          <View style={styles.row}>
            <Image source={require("./res/quest.png")} style={styles.icon} />
            <Text style={styles.header}>{question.question}</Text>
          </View>
        </TouchableOpacity>
        {open &&
          <View style={styles.alternatives}>
            {question.alternatives.map((alt, i) =>
              <TouchableOpacity
                key={alt}
                onPress={() => submitAnswer(question.id, alt)}
              >
                <View style={styles.alternativeBox}>
                  <View style={styles.placeholder}>
                    {alt === userAnswer &&
                      <Image
                        style={[styles.icon, styles.selectedPrefix]}
                        source={require("./res/check.png")}
                      />}
                  </View>
                  <Text style={styles.prefix}>
                    {PREFIX[i % PREFIX.length]}
                  </Text>
                  <Text style={styles.alternativeText}>{alt}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: primaryColor
  },
  header: {
    fontSize: 20,
    padding: 5
  },
  alternatives: {
    paddingLeft: 20,
    marginBottom: 20
  },
  alternativeBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  placeholder: {
    width: 26
  },
  prefix: {
    fontSize: 18,
    fontWeight: "900",
    color: primaryColor
  },
  selectedPrefix: {
    tintColor: selectColor,
    marginRight: 5
  },
  alternativeText: {
    padding: 5
  }
});
