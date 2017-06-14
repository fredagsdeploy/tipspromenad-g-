import { TabNavigator } from "react-navigation";

import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";

const Routes = TabNavigator(
  {
    Home: {
      screen: QuestionList
    },
    AddOwn: {
      screen: AddQuestion
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export default Routes;
