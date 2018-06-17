import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import RedButton from "./RedButton";
import TPText from "./TPText";
import TPHeader from "./TPHeader";
import TPTextInput from "./TPTextInput";
import { primaryColor, selectColor } from "./config";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

const Alternative = ({ onPressCheck, isChecked, onChange, value }) => {
  let checkStyle = [styles.icon];
  if (isChecked) {
    checkStyle.push({ tintColor: selectColor });
  }
  return (
    <View style={(styles.textInput, styles.alternativeRow)}>
      <TPTextInput
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
    <TPText style={{ marginLeft: 5 }}>
      {" "}{value.question}{" "}
    </TPText>
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
    posting: false,
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
      posting: false,
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
    const { editMode, posting } = this.state;
    const { submitQuestion, updateQuestion } = this.props.screenProps;

    if (posting) {
      return;
    }

    this.setState({
      posting: true
    });

    const state = this.state.newQuestion;
    let questionFunction = editMode ? updateQuestion : submitQuestion;

    questionFunction(state).then(this.setDefaultState).catch(({ msg }) => {
      this.setState({
        error: msg,
        posting: false
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
      posting,
      editMode
    } = this.state;
    const { questions, appModeDone, userId } = this.props.screenProps;

    if (appModeDone) {
      return (
        <Center style={styles.container}>
          <TPText style={styles.header}>Vi tillåter inte fler frågor.</TPText>
          <TPText style={styles.header}>De é fan över nu, gå hem</TPText>
        </Center>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Center>
          <TPText style={styles.header}>Skriv in en fråga, änna</TPText>
          <View style={{ marginTop: 20 }}>
            <TPTextInput
              style={styles.textInput}
              value={question}
              onChangeText={this.onChange}
            />
          </View>
        </Center>
        <Center>
          <View style={{ marginTop: 20 }}>
            <TPText style={styles.header}>
              Ge tre alternativ och markera det rätta
            </TPText>
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
          <RedButton
            onPress={this.submitQuestion}
            loading={posting}
            disabled={posting}
          >
            {editMode ? "Uppdatera fråga" : "Skapa fråga"}
          </RedButton>
          {editMode &&
            !posting &&
            <RedButton onPress={() => this.setDefaultState()}>
              Låt vara
            </RedButton>}
          {error && <TPText style={styles.error}>{error}</TPText>}
        </Center>

        <View style={{ marginTop: 20, marginLeft: 20, width: "100%" }}>
          <TPHeader>Dina gamla goa frågor</TPHeader>
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
  textInput: {
    width: 300,
    height: 30,
    borderWidth: StyleSheet.hairlineWidth
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
    marginTop: 10,
    marginLeft: 20
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
    flex: 1,
    marginBottom: 10
  },
  alternativeRow: {
    flexDirection: "row",
    marginTop: 20
  }
});
