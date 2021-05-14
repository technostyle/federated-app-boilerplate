import React from "react";
import styled from "styled-components";

const Widget = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px red;
  color: red;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreditHolidaysAppWrapper = (externalProps) => {
  return <Widget>WIDGET</Widget>;
};

export default CreditHolidaysAppWrapper;
