import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

import { lustColor } from "./config";

const buttonFont = Platform.select({
  ios: "'Avenir-Heavy'",
  android: "'Roboto'"
});

const Btn = styled.TouchableOpacity`
  background-color: ${lustColor};
  border-radius: 3px;
  padding: 10px 20px;
`;

const Text = styled.Text`
  color: white;
  font-family: ${buttonFont};
`;

export default ({ children, ...props }) =>
  <Btn {...props}>
    <Text>{children}</Text>
  </Btn>;
