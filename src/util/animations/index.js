import { keyframes } from '../styles';
import { fadeInRight } from 'react-animations';

export const slideAnimation = keyframes`${fadeInRight}`;
export const zoomInAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export const fadeOutM = keyframes`
  from {
    position: relative;
    top: initial;
    left: initial;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(100%, 0, 0);
  }
`;

export const fadeOutE = keyframes`
  from {
    position: relative;
    top: initial;
    left: initial;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(108.333%, 0, 0);
  }
`;

export const fadeOutR = keyframes`
  from {
    position: relative;
    top: initial;
    left: initial;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(-50%, 0, 0);
  }
`;

export const fadeOutN = keyframes`
  from {
    position: relative;
    top: initial;
    left: initial;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(-83.333%, 0, 0);
  }
`;

export const transparent = keyframes`
  from {
    color: initial;
    margin: initial;
    text-shadow: 0px 0px initial,
        1px 1px initial,
        2px 2px initial,
        -1px -1px initial,
        -2px -2px initial,
        -1px 1px initial,
        -2px 2px initial,
        1px -1px initial,
        2px -2px initial,
        1px 0px initial,
        2px 0px initial,
        0px 1px initial,
        0px 2px initial,
        -1px 0px initial,
        -2px 0px initial,
        0px -1px initial,
        0px -2px initial;
  }
  to {
    text-shadow: none;
    color: transparent;
    margin: auto 0;
    height: 192px;
  }
`;
