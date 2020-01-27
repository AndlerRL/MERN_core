import {
  HomeTwoTone,
  PostAddTwoTone,
  DescriptionTwoTone,
  KeyboardArrowDownTwoTone,
  TranslateTwoTone,
  LocalOfferTwoTone,
  AddRounded,
  KeyboardArrowUpTwoTone,
} from '@material-ui/icons';
import styled, { themeGet } from 'util/styles';

export const Icons = {
  Home: styled(HomeTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  Posts: styled(DescriptionTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  NewPost: styled(PostAddTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  ArrowDown: styled(KeyboardArrowDownTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  ArrowUp: styled(KeyboardArrowUpTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  Translate: styled(TranslateTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  Tag: styled(LocalOfferTwoTone)`
    color: ${themeGet('colors.secondary.200')};
  `,
  Add: styled(AddRounded)`
    color: ${themeGet('colors.secondary.200')};
  `,
};
