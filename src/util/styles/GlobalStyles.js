/* eslint-disable no-irregular-whitespace */
import { createGlobalStyle, themeGet } from './index';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Oswald";
    src: url("/fonts/Oswald/Oswald-Regular.ttf") format("ttf"),
    url("/fonts/Oswald/Oswald-Medium.ttf") format("ttf"),
    url("/fonts/Oswald/Oswald-SemiBold.ttf") format("ttf"),
    url("/fonts/Oswald/Oswald-Bold.ttf") format("ttf"),
    url("/fonts/Oswald/Oswald-Light.ttf") format("ttf"),
  }

  @font-face {
    font-family: "Open Sans";
    src: url("/fonts/Open_Sans/OpenSans-Regular.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-Light.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-Italic.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-ExtraBold.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-ExtraBoldItalic.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-Bold.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-BoldItalic.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-SemiBold.ttf") format("ttf"),
    url("/fonts/Open_Sans/OpenSans-SemiBoldItalic.ttf") format("ttf"),
  }

  @font-face {
    font-family: "Poppins";
    src: url("/fonts/Poppins/Poppins-Regular.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-Medium.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-MediumItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-Thin.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-ThinItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-ExtraLight.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-ExtraLightItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-Light.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-LightItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-Italic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-ExtraBold.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-ExtraBoldItalic.ttf") format("ttf"), 
    url("/fonts/Poppins/Poppins-Bold.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-BoldItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-SemiBold.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-SemiBoldItalic.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-Black.ttf") format("ttf"),
    url("/fonts/Poppins/Poppins-BlackItalic.ttf") format("ttf"),
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    min-height: 100vh !important;
    min-width: 320px;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    font-family: 'Open Sans', sans-serif !important;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  a {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h5 {
    font-family: 'Oswald', sans-serif !important;
    letter-spacing: 1px;
  }

  .MuiPopover-root {
    & .MuiPaper-rounded {
      border-radius: 0px 0px 4px 4px !important;
    }
    > div.MuiPaper-root {
      background-color: ${themeGet('colors.primary.900')} !important;
      color: #f5f5f5;
      font-weight: 300 !important;
      top: 0px !important;
      
      &:focus {
        background-color: ${themeGet('colors.primary.900')} !important;
        color: #f5f5f5;
        font-weight: 300 !important;
      }
    }
  }
`;

export default GlobalStyles;
