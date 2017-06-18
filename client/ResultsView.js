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

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

const Alternative = ({ onChange, value }) =>
  <TextInput style={styles.textInput} value={value} onChangeText={onChange} />;

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

  render() {
    const { questions, answers } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Center>
          <Text style={styles.header}>Vem var görbra?</Text>

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
  }
});
