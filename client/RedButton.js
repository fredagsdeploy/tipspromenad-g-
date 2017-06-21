import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Platform } from "react-native";

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

export default ({ children, loading, ...props }) =>
  <Btn {...props}>
    {loading ? <ActivityIndicator color="white" /> : <Text>{children}</Text>}
  </Btn>;
