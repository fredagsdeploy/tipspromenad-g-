import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;
const Button = ({ onPress, ...props }) =>
  <TouchableOpacity onPress={onPress}>
    <Text
      {...props}
      style={{ marginTop: 10, padding: 10, backgroundColor: "lightblue" }}
    />
  </TouchableOpacity>;

export default class Register extends React.Component {
  state = {
    nick: ""
  };

  onChange = nick => {
    this.setState({ nick });
  };

  render() {
    const { nick } = this.state;
    return (
      <View style={styles.container}>
        <Center>
          <Text style={styles.header}>Skriv in nick, änna</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={this.onChange}
            value={nick}
          />
          <Button onPress={() => this.props.onSubmit(nick)}>
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
  textInput: {
    marginTop: 20,
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "#000"
  }
});
