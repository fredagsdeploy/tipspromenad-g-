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

export default class AddQuestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Add",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./plus.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    newQuestion: {
      question: "",
      alternatives: [""]
    },
    error: null
  };

  addAlternative = () =>
    this.setState(state => ({
      newQuestion: {
        ...state.newQuestion,
        alternatives: [...state.alternatives, ""]
      }
    }));

  submitQuestion = () => {
    const state = this.state.newQuestion;
    this.props.screenProps.submitQuestion(state)
      .then(() => {
        this.setState({
          newQuestion: {
            question: "",
            alternatives: [""]
          }
        });
      }).catch(({msg}) => {
        this.setState({
          error: msg
        })
      });
    
  };

  onChange = question => this.setState(state => ({
    newQuestion: {
      ...state.newQuestion,
      question
    }
  }));

  onChangeAlternative = (index, value) =>
    this.setState(state => ({
      newQuestion: {
        ...state.newQuestion,
        alternatives: state.newQuestion.alternatives.map((v, i) => {
          if (i === index) {
            return value;
          } else {
            return v;
          }
        })
      }
    }));

  render() {
    const { newQuestion: {question, alternatives}, error} = this.state;
    return (
      <ScrollView style={styles.container}>
        <Center>
          <Text style={styles.header}>Skriv in en fråga, änna</Text>
          <View>
            <TextInput
              style={styles.textInput}
              value={question}
              onChangeText={this.onChange}
            />
          </View>
        </Center>
        <Center>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.header}>Ge lite alternativ, änna</Text>
          </View>
          <View>
            <Button onPress={this.addAlternative}>Lägg till alternativ</Button>
            {alternatives.map((alt, index) =>
              <Alternative
                value={alt}
                key={index}
                onChange={value => this.onChangeAlternative(index, value)}
              />
            )}
          </View>
          <Button onPress={this.submitQuestion}>Skapa fråga</Button>
           {error && <Text style={styles.error}>{error}</Text>}
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
