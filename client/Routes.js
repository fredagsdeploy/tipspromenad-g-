import { TabNavigator } from "react-navigation";

import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import DistanceView from "./DistanceView";

const Routes = TabNavigator(
  {
    Home: {
      screen: QuestionList
    },
    AddOwn: {
      screen: AddQuestion
    },
    Distance: {
      screen: DistanceView
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export default Routes;
