import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  AsyncStorage
} from "react-native";
import { Constants } from "expo";

import { postJson } from "./fetch";
import Button from "./Button";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

export default class Register extends React.Component {
  state = {
    nick: "",
    error: null
  };

  createUser = async () => {
    postJson("/users", {
      nick: this.state.nick,
      id: Constants.deviceId
    })
      .then(user => {
        AsyncStorage.setItem("user", JSON.stringify(user));
        this.props.setUser(user);
      })
      .catch(({ msg }) => {
        this.setState({ error: msg, nick: "" });
      });
  };

  onChange = nick => {
    this.setState({ nick });
  };

  render() {
    const { nick, error } = this.state;
    const { style } = this.props;
    return (
      <View style={[style, styles.container]}>
        <Center>
          <Text style={styles.header}>Skriv in nick, änna</Text>
          {error && <Text style={styles.error}>{error}</Text>}

          <TextInput
            style={styles.textInput}
            onChangeText={this.onChange}
            value={nick}
          />
          <Button onPress={this.createUser}>
            Skapa användare
          </Button>
        </Center>
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
    fontSize: 20,
    padding: 5
  },
  error: {
    marginVertical: 5,
    color: "tomato"
  },
  textInput: {
    marginTop: 20,
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "#000"
  }
});
