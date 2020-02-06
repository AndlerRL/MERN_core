/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'util/styles';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem } from '@material-ui/core';

const Input = styled(TextField)`
  width: 100%;
  margin: 1rem auto !important;

  & .MuiInputBase-input {
    color: blue;
  }
`;

const InputComponent = React.memo(({
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
  disabled
}) => {
  const { t } = useTranslation('postForm');
  let inputElement = null;
  let errorHelperText = null;

  if (invalid && touched)
    errorHelperText = `${t('error.0')}${label.toLowerCase()}${t('error.1')}`;

  if (invalid && touched && label === t('login.confirmPW'))
    errorHelperText = t('login.errorPW');

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
        required={shouldValidate.required}
        disabled={disabled}
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
        required={shouldValidate.required}
        disabled={disabled}
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
        required={shouldValidate.required}
        rows="5"
        disabled={disabled}
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
        required={shouldValidate.required}
        helperText={errorHelperText || 'Please, select your option'}
        disabled={disabled}
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
        required={shouldValidate.required}
        disabled={disabled}
      />
    );
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
        required={shouldValidate.required}
        disabled={disabled}
      />
    );
  }

  return (
    inputElement
  );
});

InputComponent.propTypes = {
  touched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  elementConfig: PropTypes.object.isRequired,
  inputRef: PropTypes.func,
};

export default InputComponent;
