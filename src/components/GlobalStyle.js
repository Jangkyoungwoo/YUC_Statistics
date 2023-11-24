import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: "SpoqaHanSansNeo-Medium";
  font-weight: 300;
  src: url("./fonts/SpoqaHanSansNeo_OTF_subset/SpoqaHanSansNeo-Medium.woff")
    format("woff");
}

  body {
    font-family: 'SpoqaHanSansNeo-Medium', sans-serif;
  }
`;

export default GlobalStyle;
