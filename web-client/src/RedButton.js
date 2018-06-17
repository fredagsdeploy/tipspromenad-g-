import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Platform } from "react-native";

import { primaryColor } from "./config";

const buttonFont = "Roboto";

const Btn = styled.TouchableOpacity`
  background-color: ${primaryColor};
  border-radius: 3px;
  padding: 10px 20px;
  margin: 5px;
`;

const Text = styled.Text`
  color: white;
  font-family: ${buttonFont};
`;

export default ({ children, loading, ...props }) => (
  <Btn {...props}>
    {loading ? <ActivityIndicator color="white" /> : <Text>{children}</Text>}
  </Btn>
);
