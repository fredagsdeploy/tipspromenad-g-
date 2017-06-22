import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View
} from "react-native";

import TPText from "./TPText";

import { primaryColor, baseTextColor } from "./config";

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
            <Image
              source={{ uri: "https://didit.rocks/res/lock.png" }}
              style={styles.icon}
            />
            <TPText style={styles.header}>Låst</TPText>
          </View>
        </View>
      );
    }

    const getHeaderImage = hasAnswer => {
      if (hasAnswer) {
        return (
          <Image
            source={require("./res/cross.png")}
            style={[styles.icon, { tintColor: baseTextColor }]}
          />
        );
      } else {
        return (
          <Image
            source={{ uri: "https://didit.rocks/res/quest.png" }}
            style={styles.icon}
          />
        );
      }
    };

    const header = (
      <View style={styles.row}>
        {getHeaderImage(userAnswer)}
        <TPText style={styles.header}>{question.question}</TPText>
      </View>
    );

    return (
      <View style={styles.container}>
        {(open && header) ||
          <TouchableOpacity onPress={onPressHeader}>
            {header}
          </TouchableOpacity>}
        {open &&
          <View style={styles.alternatives}>
            {question.alternatives.map((alt, i) =>
              <TouchableOpacity
                key={i}
                onPress={() => submitAnswer(question.id, alt)}
              >
                <View style={styles.alternativeBox}>
                  <View style={styles.placeholder}>
                    {alt === userAnswer &&
                      <Image
                        style={[styles.icon, styles.selectedPrefix]}
                        source={require("./res/cross.png")}
                      />}
                  </View>
                  <TPText style={styles.prefix}>
                    {PREFIX[i % PREFIX.length]}
                  </TPText>
                  <TPText style={styles.alternativeText}>{alt}</TPText>
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
    marginHorizontal: 20,
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
    tintColor: baseTextColor,
    marginRight: 5
  },
  alternativeText: {
    padding: 5
  }
});
