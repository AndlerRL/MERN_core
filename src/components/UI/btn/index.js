import { Button } from '@material-ui/core';
import styled, { themeGet } from 'util/styles';

export const Btn = {
  Primary: styled(Button)`
    font-weight: ${themeGet('fontWeights.light')} !important;
    
    &[variant="contained"],
    &.MuiButton-contained {
      background-color: ${themeGet('colors.primary.300')} !important;
    }
  `,
  Secondary: styled(Button)`
    font-weight: ${themeGet('fontWeights.light')} !important;
    
    &[variant="contained"],
    &.MuiButton-contained {
      background-color: ${themeGet('colors.secondary.300')} !important;
    }
  `
};
