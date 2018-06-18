import React from "react";
import { View, Image } from "react-native";

import { Route, Switch } from "react-router";

import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import DistanceView from "./DistanceView";
import ResultsView from "./ResultsView";
import TPNavLink from "./TPNavLink";
import styled from "styled-components/native";
import { primaryColor, plaintextFont, baseTextColor } from "./config";

const PropsRoute = ({ component: Component, passProps, ...props }) => (
  <Route {...props} render={() => <Component screenProps={passProps} />} />
);

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-content: space-evenly;
`;

const NavButton = ({ icon, children, ...props }) => (
  <TPNavLink
    replace={true}
    {...props}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: baseTextColor,
      textDecoration: "none",
      fontFamily: plaintextFont
    }}
    activeStyle={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: primaryColor
    }}
  >
    {({ isActive }) => (
      <React.Fragment>
        <Image
          source={icon}
          style={{
            width: 26,
            height: 26,
            tintColor: isActive ? primaryColor : baseTextColor
          }}
        />
        {children}
      </React.Fragment>
    )}
  </TPNavLink>
);

const Routes = ({ props }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between"
    }}
  >
    <Switch>
      <PropsRoute exact passProps={props} path="/" component={QuestionList} />
      <PropsRoute passProps={props} path="/distance" component={DistanceView} />
      <PropsRoute passProps={props} path="/add-own" component={AddQuestion} />
      <PropsRoute passProps={props} path="/result" component={ResultsView} />
    </Switch>
    <Row>
      <NavButton exact to="/" icon={require("./res/list.png")}>
        Questions
      </NavButton>
      <NavButton to="/distance" icon={require("./res/distance.png")}>
        Distance
      </NavButton>
      <NavButton to="/add-own" icon={require("./res/plus.png")}>
        Add
      </NavButton>
      <NavButton to="/result" icon={require("./res/result.png")}>
        Result
      </NavButton>
    </Row>
  </View>
);

export default Routes;
