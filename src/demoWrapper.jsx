import React from "react";
import styled from "styled-components";
import Widget from "./widget";

const WidgetWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);
  border: solid 1px;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DemoWrapper = () => {
  return (
    <WidgetWrapper>
      <Widget />
    </WidgetWrapper>
  );
};
