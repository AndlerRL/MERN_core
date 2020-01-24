/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import styled from 'util/styles';
import { ToggleLayer } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';
import ResizeObserver from 'resize-observer-polyfill';
import composeRef from 'components/composeRef';

const getArrowTranslate = layerSide => {
  let x = '-50%';
  let y = 0;

  const OFFSET = 3.5;
  if (layerSide === 'left') {
    x = `${-OFFSET}px`;
    y = '-50%';
  } else if (layerSide === 'right') {
    x = `${OFFSET}px`;
    y = '-50%';
  }

  const rotation = {
    top: 180,
    right: -90,
    left: 90,
    bottom: 0
  };


  return `translate(${x}, ${y}) rotate(${rotation[layerSide]}deg)`;
};

const outTransform = {
  top: { x: 0, y: -20 },
  left: { x: -20, y: 0 },
  bottom: { x: 0, y: 20 },
  right: { x: 20, y: 0 }
};

const TooltipContainer = styled(motion.div)`
  transition: color 0.15s, background-color 0.15s, width 0.25s ease-in-out;
  position: absolute;
  width: 160px;
  padding: 4px 0px;
  list-style: none;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
  margin: 0;
  background-color: white;
  color: #333;
  border: 1px solid rgba(27, 31, 35, 0.15);
`;

const TooltipText = styled.p`
  text-align: center;
`;

const Arrow = props => (
  <svg width={14} height={7} {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#CDCFD0"
        d="M7 .07v1.428l-5.55 5.5L0 6.982zM7 .07v1.428l5.55 5.5L14 6.982z"
      />
      <path fill="#FFF" d="M1.45 7L7 1.498 12.55 7z" />
    </g>
  </svg>
);

const Tooltip = forwardRef(({ children, className, style, arrowStyle, layerSide }, ref) => {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      ...outTransform[layerSide]
    },
    initial: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0
    }
  };

  return (
    <TooltipContainer
      ref={ref}
      className={className}
      style={style}
      initial={variants.hidden}
      animate={variants.initial}
      exit={variants.hidden}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35
      }}
    >
      {children}
      <Arrow
        style={{
          ...arrowStyle,
          position: 'absolute',
          transformOrigin: 'center',
          transform: getArrowTranslate(layerSide)
        }}  
      />
    </TooltipContainer>
  );
});

const PopoverTooltip = forwardRef((props, ref) => (
  <ToggleLayer
    ResizeObserver={ResizeObserver}
    renderLayer={({ isOpen, layerProps, arrowStyle, layerSide }) => (
      <AnimatePresence>
        {isOpen && !props.visible ? (
          <Tooltip
            ref={layerProps.ref}
            style={{
              ...layerProps.style,
              marginTop: props.mTop && props.mTop,
              marginBottom: props.mBot && props.mBot,
              marginLeft: props.mLef && props.mLef,
              marginRight: props.mRig && props.mRig,
            }}
            arrowStyle={arrowStyle}
            layerSide={layerSide}
          >
            <TooltipText>
              {props.text}
            </TooltipText>
          </Tooltip>
        ) : null}
      </AnimatePresence>
    )}
    closeOnOutsideClick
    closeOnDisappear="partial"
    placement={{
      anchor: props.anchorPos,
      autoAdjust: true,
      snapToAnchor: false,
      triggerOffset: 12,
      scrollOffset: 16,
      preferX: 'RIGHT'
    }}
  >
    {({ isOpen, triggerRef, toggle }) => (
      <motion.div
        ref={composeRef(triggerRef, ref)}
        onMouseEnter={toggle}
        style={props.style}
        initial={props.initial}
        animate={props.animate}
        onTap={props.onTap}
        whileTap={props.whileTap && props.whileTap}
        whileHover={props.whileHover && props.whileHover}
        transition={props.transition && props.transition}
        className={props.className}
        onClick={props.clicked}
      >
        {props.children}
      </motion.div>
    )}
  </ToggleLayer>
)
);

export default PopoverTooltip;
