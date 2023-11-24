import styled from "styled-components";

export const categoryDiv = styled.div`
  border: 2px solid;
  width: 750px;
  border-color: #d7e3f1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;
export const valueDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 370px;
  border-left: ${(props) => (props.hasBorder ? "1px solid #d7e3f1" : "none")};
`;
export const borderLeftDiv = styled.div`
  padding-left: 5px;
  border-left: ${(props) => (props.hasBorder ? "2px solid #d7e3f1" : "none")};
`;
export const marginRightDiv = styled.div`
  margin-right: 5px;
`;
export const resultSpan = styled.span`
  color: #55b6ff;
`;
export const sumDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
