/**
 * This is our custom theme where we define global styles.
 * It should serve as a guideline for styling, but not all styles *have* to be taken from here.
 */
const breakpoints = ['40em', '52em', '64em'];

/**
 * Primary: Colors to use for actionable items, such as links, buttons etc.
 * Grey: Colors for items that are not that important
 */
const colors = {
  white: '#f5f5f5',
  black: '#101010',
  primary: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#009688',
    600: '#00897b',
    700: '#00796b',
    800: '#00695c',
    900: '#004d40',
  },
  secondary: {
    50: '#f9fbe7',
    100: '#f0f4c3',
    200: '#e6ee9c',
    300: '#dce775',
    400: '#d4e157',
    500: '#cddc39',
    600: '#c0ca33',
    700: '#afb42b',
    800: '#9e9d24',
    900: '#827717',
  },
  error: {
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  warning: {
    100: '#fff9c4',
    200: '#fff59d',
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b',
    600: '#fdd835',
    700: '#fbc02d',
    800: '#f9a825',
    900: '#f57f17',
  },
  success: {
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
};

/**
 * Space is used for margin and padding scales.
 * It's recommended to use powers of two to ensure alignment across the entire project
 */
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

/**
 * Typographic scale
 */
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

const lineHeights = [1, 1.125, 1.25, 1.5];

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
};

/**
 * Letter-spacing should vary, depending on usage of text
 */
const letterSpacings = {
  normal: 'normal',
  caps: '0.25em',
  labels: '0.05em',
};

/**
 * Border-radius
 */
const radii = [0, 2, 4, 8, 16];

const shadows = {
  d1: ['0 2px 2px 0 rgba(0, 0, 0, 0.14)', '0 3px 1px -2px rgba(0, 0, 0, 0.12)', '0 1px 5px 0 rgba(0, 0, 0, 0.2)'],
  d1_half: ['0 3px 3px 0 rgba(0, 0, 0, 0.14)', '0 1px 7px 0 rgba(0, 0, 0, 0.12)', '0 3px 1px -1px rgba(0, 0, 0, 0.2)'],
  d2: ['0 4px 5px 0 rgba(0, 0, 0, 0.14)', '0 1px 10px 0 rgba(0, 0, 0, 0.12)', '0 2px 4px -1px rgba(0, 0, 0, 0.3)'],
  d3: ['0 8px 17px 2px rgba(0, 0, 0, 0.14)', '0 3px 14px 2px rgba(0, 0, 0, 0.12)', '0 5px 5px -3px rgba(0, 0, 0, 0.2)'],
  d4: ['0 16px 24px 2px rgba(0, 0, 0, 0.14)', '0 6px 30px 5px rgba(0, 0, 0, 0.12)', '0 8px 10px -7px rgba(0, 0, 0, 0.2)'],
  d5: ['0 24px 38px 3px rgba(0, 0, 0, 0.14)', '0 9px 46px 8px rgba(0, 0, 0, 0.12)', '0 11px 15px -7px rgba(0, 0, 0, 0.2)']
};

export const theme = {
  name: 'Default',
  breakpoints,
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  shadows
};
