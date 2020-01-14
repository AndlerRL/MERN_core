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
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    top: 0;
    transform: translate3d(100%, 0, 0);
  }
`;

export const fadeOutE = keyframes`
  from {
    position: relative;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    top: 0;
    transform: translate3d(125%, 0, 0);
  }
`;

export const fadeOutR = keyframes`
  from {
    position: relative;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    top: 0;
    transform: translate3d(-50%, 0, 0);
  }
`;

export const fadeOutN = keyframes`
  from {
    position: relative;
    transform: translate3d(0, 0, 0);
  }
  to {
    position: absolute;
    top: 0;
    transform: translate3d(-80%, 0, 0);
  }
`;

export const transparent = keyframes`
  from {
    color: initial;
    text-shadow: initial;
  }
  to {
    text-shadow: none;
    color: transparent;
  }
`;
