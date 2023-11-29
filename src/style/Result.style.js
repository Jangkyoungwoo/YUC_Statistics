import styled from "styled-components";

export const table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 700px;
  border-radius: 18px;
  color: #74798c;
`;
export const td = styled.td`
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
  text-align: left;
  vertical-align: top;
  background-color: ${(props) => props.bgColor};
  border-color: #d7e3f1;
  font-family: SpoqaHanSansNeo-Medium;
`;
export const th = styled.th`
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
  text-align: left;
  vertical-align: top;
  background-color: ${(props) => props.bgColor};
  border-color: #d7e3f1;
  font-family: SpoqaHanSansNeo-Medium;
`;
