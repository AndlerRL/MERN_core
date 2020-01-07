import { createGlobalStyle } from './index';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Oswald:300,400,700|Poppins:300,400,500,600,700&display=swap');
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    min-height: 100vh;
    min-width: 320px;
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f5f5f5;
  }
  
  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
