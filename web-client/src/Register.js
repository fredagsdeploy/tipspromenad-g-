import React from "react";
import { StyleSheet, View, Image, AsyncStorage } from "react-native";

import { postJson } from "./fetch";
import RedButton from "./RedButton";
import TPText from "./TPText";
import TPTextInput from "./TPTextInput";
import { getDeviceId } from "./lib/get_device_id";
import styled from "styled-components/native";

const LinearGradient = styled.View`
  background-image: url(${require("./res/start.png")}),
    linear-gradient(${props => props.colors.join(",")});
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Center = props => (
  <View {...props} style={{ alignItems: "center", flex: 1 }} />
);

export default class Register extends React.Component {
  state = { nick: "", error: null };

  createUser = async () => {
    postJson("/users", { nick: this.state.nick, id: getDeviceId() })
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
      <Container style={style}>
        <LinearGradient colors={["#A6D6F0", "#fff"]} style={styles.gradient}>
          <Image source={require("./res/logo.png")} style={[styles.logo]} />
          <TPText style={styles.header}>Skriv in nick, änna</TPText>
          {error && <TPText style={styles.error}>{error}</TPText>}
          <Center>
            <TPTextInput
              style={styles.textInput}
              onChangeText={this.onChange}
              value={nick}
            />
            <RedButton onPress={this.createUser}>Nu kôr vi!</RedButton>
            <Image source={require("./res/start.png")} style={styles.image} />
          </Center>
        </LinearGradient>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: { fontSize: 20, padding: 5, backgroundColor: "transparent" },
  error: { marginVertical: 5, color: "tomato" },
  textInput: {
    backgroundColor: "white",
    marginVertical: 20,
    width: 300,
    height: 30,
    borderWidth: 0
  },
  logo: { flex: 1, width: 300, height: 300, resizeMode: "contain" },
  image: { flex: 1, resizeMode: "contain" },
  gradient: { flex: 1, alignItems: "center", justifyContent: "center" }
});

const Container = styled.View`
  flex: 1;
  background-color: #a6d6f0;
  /* Status bar height on iOS 10 */
  padding-top: 20px;
  /* Status bar height on iOS 11.0 */
  padding-top: constant(safe-area-inset-top);
  /* Status bar height on iOS 11+ */
  padding-top: env(safe-area-inset-top);
`;
