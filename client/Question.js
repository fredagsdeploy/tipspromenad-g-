import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View
} from "react-native";

export default class Question extends React.PureComponent {
  state = {
    open: false
  };

  toggleOpen = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const { open } = this.state;
    const { question } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={require("./quest.png")} style={styles.icon} />
          <TouchableOpacity onPress={this.toggleOpen}>
            <Text style={styles.header}>{question.question}</Text>
          </TouchableOpacity>
        </View>
        {open &&
          <View style={styles.alternatives}>
            {question.alternatives.map(alt =>
              <TouchableOpacity key={alt}>
                <Text style={styles.alternative}>{alt}</Text>
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
    tintColor: "#e91e63"
  },
  header: {
    fontSize: 20,
    padding: 5
  },
  alternatives: {
    paddingLeft: 20,
    marginBottom: 20
  },
  alternative: {
    padding: 5
  }
});
