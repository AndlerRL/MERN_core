/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import styled, { themeGet } from 'util/styles';
import { TextField, MenuItem } from '@material-ui/core';

const Input = styled(TextField)`
  width: 100%;

  & .MuiInputBase-input {
    color: blue;
  }
`;

const input = ({
  shouldValidate,
  touched,
  invalid,
  label,
  changed,
  value,
  htmlFor,
  inputRef,
  elementType,
  elementConfig,
}) => {
  let inputElement = null;
  let errorHelperText = null;

  if (invalid && touched)
    errorHelperText = `Please, put a valid ${label.toLowerCase()}.`;

  if (invalid && touched && label === 'Confirm Password')
    errorHelperText = 'Sorry, password doesn\'t match.';

  switch (elementType) {
  case 'input':
    inputElement = (
      <Input
        {...elementConfig}
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        error={invalid && touched}
        helperText={errorHelperText}
        required={shouldValidate}
      />
    );
    break;
  case 'email':
    inputElement = (
      <Input
        {...elementConfig}
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        error={invalid && touched}
        helperText={errorHelperText}
        required={shouldValidate}
      />
    );
    break;
  case 'textarea':
    inputElement = (
      <Input
        {...elementConfig}
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        multiline
        error={invalid && touched}
        helperText={errorHelperText}
        required={shouldValidate}
      />
    );
    break;
  case 'select':
    inputElement = (
      <Input
        {...elementConfig}
        select
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        error={invalid && touched}
        required={shouldValidate}
        helperText={errorHelperText || 'Please, select your option'}
      >
        {elementConfig.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.displayValue}
          </MenuItem>
        ))}
      </Input>
    );
    break;
  case 'password':
    inputElement = (
      <Input
        {...elementConfig}
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        error={invalid && touched}
        helperText={errorHelperText}
        required={shouldValidate}
      />
    )
    break;
  default:
    inputElement = (
      <Input
        {...elementConfig}
        value={value}
        id={htmlFor}
        label={label}
        onChange={changed}
        ref={inputRef}
        error={invalid && touched}
        helperText={errorHelperText}
        required={shouldValidate}
      />
    );
  }

  return (
    inputElement
  );
};

input.propTypes = {
  touched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  shouldValidate: PropTypes.object,
  elementConfig: PropTypes.object.isRequired,
};

export default input;
