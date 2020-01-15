import { createGlobalStyle, themeGet } from './index';

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
    background-color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  a {
    text-decoration: none;
  }

  .MuiPopover-root > div.MuiPaper-root {
      background-color: ${themeGet('colors.primary.50')} !important;
      
      &:focus {
        background-color: ${themeGet('colors.primary.50')} !important;
      }
    }
`;

export default GlobalStyles;
