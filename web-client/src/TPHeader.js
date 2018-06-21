import styled from "styled-components/native";

import { plaintextFont, headerTextColor } from "./config";

export default styled.Text`
  font-family: ${plaintextFont};
  color: ${headerTextColor};
  font-size: 24;
  border-bottom-width: 1;
  border-bottom-color: ${headerTextColor};
  padding: 5px 0;
  width: 100%;
`;
