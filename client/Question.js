import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";

export default class Question extends React.PureComponent {
  render() {
    const { question } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{question.question}</Text>
        {question.alternatives.map(alt =>
          <TouchableOpacity key={alt}>
            <Text style={styles.alternative}>{alt}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    backgroundColor: "red",
    fontSize: 20,
    padding: 5
  },
  alternative: {
    padding: 5
  }
});
