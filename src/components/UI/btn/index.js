import { Button } from '@material-ui/core';
import styled, { themeGet } from 'util/styles';

export const Btn = {
  Primary: styled(Button)`
    font-weight: ${themeGet('fontWeights.light')} !important;
    color: ${themeGet('colors.white')} !important;
    padding: 8px 10px !important;

    a {
      color: ${themeGet('colors.white')} !important;
    }
    
    &[variant="contained"],
    &.MuiButton-contained {
      background-color: ${themeGet('colors.primary.200')} !important;
    }
  `,
  Secondary: styled(Button)`
    font-weight: ${themeGet('fontWeights.light')} !important;
    color: ${themeGet('colors.black')} !important;
    padding: 8px 10px !important;

    a {
      color: ${themeGet('colors.black')} !important;
    }
    
    &[variant="contained"],
    &.MuiButton-contained {
      background-color: ${themeGet('colors.secondary.200')} !important;
    }
  `
};
