import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  ActivityIndicator,
  View,
  FlatList,
  LayoutAnimation,
  UIManager
} from "react-native";

import _ from "lodash";

import Question from "./Question";

import { primaryColor, unlockDistanceInterval } from "./config";

const Center = props => <View {...props} style={{ alignItems: "center" }} />;

export default class QuestionList extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: "Upplåsta",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("./res/list.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  state = {
    openKey: null,
    imagesLoaded: false
  };

  componentDidMount() {
    Promise.all([
      Image.prefetch("https://didit.rocks/res/check.png"),
      Image.prefetch("https://didit.rocks/res/quest.png"),
      Image.prefetch("https://didit.rocks/res/lock.png")
    ]).then(() => {
      this.setState({
        imagesLoaded: true
      });
    });
    // UIManager.setLayoutAnimationEnabledExperimental &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  setOpen = key => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ openKey: key });
  };

  render() {
    const {
      questions,
      loading: loadingQuestions,
      refreshData,
      userId,
      answers,
      submitAnswer,
      unlockCount
    } = this.props.screenProps;
    const { openKey, imagesLoaded } = this.state;

    const getAnswerForQuestionId = qId => (answers[qId] || {})[userId];

    if (!imagesLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        style={styles.container}
        onRefresh={refreshData}
        refreshing={loadingQuestions}
        ListEmptyComponent={
          <View style={styles.container}>
            <Center>
              <Text>Gå hem, de é fan tomt.</Text>
            </Center>
          </View>
        }
        data={questions}
        renderItem={({ item: q, index: i }) => (
          <Question
            onPressHeader={() => this.setOpen(q.id)}
            open={q.id === openKey}
            userAnswer={getAnswerForQuestionId(q.id)}
            unlocked={i < unlockCount}
            key={q.id}
            question={q}
            submitAnswer={submitAnswer}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 26,
    height: 26
  }
});
