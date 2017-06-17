import { TabNavigator } from "react-navigation";

import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import DistanceView from "./DistanceView";

import { primaryColor } from "./config";

const Routes = TabNavigator(
  {
    Home: {
      screen: QuestionList
    },
    Distance: {
      screen: DistanceView
    },
    AddOwn: {
      screen: AddQuestion
    }
  },
  {
    tabBarOptions: {
      activeTintColor: primaryColor
    }
  }
);

export default Routes;
