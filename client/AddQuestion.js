import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Button from "./Button";
import { primaryColor, selectColor } from "./config";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

const Alternative = ({ onPressCheck, isChecked, onChange, value }) => {
  let checkStyle = [styles.icon];
  if (isChecked) {
    checkStyle.push({ tintColor: selectColor });
  }
  return (
    <View style={(styles.textInput, styles.alternativeRow)}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={() => onPressCheck()}>
        <Image style={checkStyle} source={require("./res/check.png")} />
      </TouchableOpacity>
    </View>
  );
};

const QuestionItem = ({ value }) =>
  <View style={styles.questionItem}>
    <Image style={styles.icon} source={require("./res/edit.png")} />
    <Text>
      {" "}{value.question}{" "}
    </Text>
  </View>;

export default class AddQuestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Ny",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./res/plus.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    newQuestion: {
      question: "",
      alternatives: ["", "", ""],
      correctAlternative: null
    },

    error: null,
    editMode: false
  };

  setDefaultState = () => {
    this.setState({
      newQuestion: {
        question: "",
        alternatives: ["", "", ""],
        correctAlternative: null
      },

      error: null,
      editMode: false
    });
  };

  addAlternative = () =>
    this.setState(state => ({
      newQuestion: {
        ...state.newQuestion,
        alternatives: [...state.alternatives, ""]
      }
    }));

  submitQuestion = () => {
    const { editMode } = this.state;
    const { submitQuestion, updateQuestion } = this.props.screenProps;

    const state = this.state.newQuestion;
    let questionFunction = editMode ? updateQuestion : submitQuestion;

    questionFunction(state).then(this.setDefaultState).catch(({ msg }) => {
      this.setState({
        error: msg
      });
    });
  };

  onChange = question =>
    this.setState(state => ({
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

  onQuestionPress = q => {
    this.setState({
      newQuestion: q,
      editMode: true
    });
  };

  onPressCheck = index => {
    this.setState(state => ({
      newQuestion: {
        ...state.newQuestion,
        correctAlternative: index === state.newQuestion.correctAlternative
          ? null
          : index
      }
    }));
  };

  render() {
    const {
      newQuestion: { question, alternatives, correctAlternative },
      error,
      editMode
    } = this.state;
    const { questions, userId } = this.props.screenProps;
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
            <Text style={styles.header}>Ge tre alternativ, änna</Text>
          </View>
          <View style={styles.alternativesContainer}>
            {alternatives.map((alt, index) =>
              <Alternative
                value={alt}
                key={index}
                alternativeNumber={index}
                isChecked={index === correctAlternative}
                onPressCheck={() => this.onPressCheck(index)}
                onChange={value => this.onChangeAlternative(index, value)}
              />
            )}
          </View>
          <Button onPress={this.submitQuestion}>
            {editMode ? "Uppdatera fråga" : "Skapa fråga"}
          </Button>
          {editMode &&
            <Button onPress={() => this.setDefaultState()}>Låt vara</Button>}
          {error && <Text style={styles.error}>{error}</Text>}
        </Center>

        <Center>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.header}>Dina gamla goa frågor</Text>
          </View>
          <View style={styles.questionHistoryContainer}>
            {questions.filter(q => q.author === userId).map((q, index) =>
              <TouchableOpacity
                key={index}
                onPress={() => this.onQuestionPress(q)}
              >
                <QuestionItem value={q} />
              </TouchableOpacity>
            )}
          </View>
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
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "#000"
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: primaryColor
  },
  error: {
    marginTop: 10,
    color: "tomato"
  },
  questionHistoryContainer: {
    flex: 1,
    marginBottom: 40
  },
  questionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  placeholder: {
    width: 26
  },
  alternativesContainer: {
    flex: 1
  },
  alternativeRow: {
    flexDirection: "row",
    marginTop: 20
  }
});
