import React from "react";
import styled from "styled-components/native";

import { lustColor } from "./config";

const Btn = styled.TouchableOpacity`
  background-color: ${lustColor}
  border-radius: 3px
  padding: 10px 20px
`;

const Text = styled.Text`
  color: white
`;

export default ({ children, ...props }) =>
  <Btn {...props}>
    <Text>{children}</Text>
  </Btn>;
