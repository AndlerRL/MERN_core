/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import PropTypes from 'prop-types';
import { Btn } from 'components/UI/btn';
import { Chip } from '@material-ui/core';
import Input from '../UI/input';
import { Icons } from '../UI/icons';

const Form = styled(Flex)`
  width: 91.666%;
  max-width: 1000px;
  border-radius: 4px;
  background: linear-gradient(45deg, #2222 16.666%, #7772 83.333%);
  margin: 0 auto;

  > div {
    margin-left: auto;
    margin-right: auto;
  }
`;

const PostForm = ({ form, submitting, onSubmit, onChange, onDelete }) => {
  const TopicsContainer = styled(Flex)`
    position: absolute;
    bottom: 6px;
    z-index: 1;

    + div.MuiFormControl-root > div.MuiInputBase-root > input {
      height: 32px;
      color: ${form.topics.value.length ? 'transparent' : 'initial'};
    }
  `;

  const formEleArray = [];

  for (const key in form) {
    formEleArray.push({
      id: key,
      config: form[key]
    });
  }

  const postForm1 = formEleArray.map(ele => (
    ele.config.label === 'First' || ele.config.label === 'Last' ?
      <Box width={5 / 12}>
        <Input
          key={ele.id}
          invalid={!ele.config.validation.valid}
          shouldValidate={ele.config.validation}
          touched={ele.config.validation.touched}
          elementType={ele.config.elementType}
          elementConfig={ele.config.elementConfig}
          value={ele.config.value}
          label={ele.config.label}
          htmlFor={ele.config.label}
          changed={e => onChange(e, ele.id)}
        />
      </Box>
      : null
  ));

  const postForm2 = formEleArray.map(ele => (
    ele.config.label === 'Post Content' ?
      <Input
        key={ele.id}
        invalid={!ele.config.validation.valid}
        shouldValidate={ele.config.validation}
        touched={ele.config.validation.touched}
        elementType={ele.config.elementType}
        elementConfig={ele.config.elementConfig}
        value={ele.config.value}
        label={ele.config.label}
        htmlFor={ele.config.label}
        changed={e => onChange(e, ele.id)}
      />
      : null
  ));

  const postForm3 = formEleArray.map(ele => (
    ele.config.label === 'Topics' ?
      <Input
        key={ele.id}
        invalid={!ele.config.validation.valid}
        shouldValidate={ele.config.validation}
        touched={ele.config.validation.touched}
        elementType={ele.config.elementType}
        elementConfig={ele.config.elementConfig}
        value={ele.config.value}
        label={ele.config.label}
        htmlFor={ele.config.label}
        changed={e => onChange(e, ele.id)}
        helperText="Testing helper"
      />
      : null
  ));
  
  return (
    <Form as="form"
      onSubmit={onSubmit}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      autoComplete="off"
    >
      <Flex 
        width={11 / 12}
        alignItems="center"
        justifyContent="space-between"
        my={3}
      >
        {postForm1}
      </Flex>
      <Box width={11 / 12} my={3}>
        {postForm2}
      </Box>
      <Box width={11 / 12} my={3} style={{ position: 'relative' }}>
        <TopicsContainer>
          {form.topics.value.length && form.topics.value[0] !== '' ?
            form.topics.value.map((t, i) => (
              <Chip key={i} 
                avatar={<Icons.Tag fontSize="inherit" />} 
                label={t} 
                onDelete={() => onDelete(t)}
              />
            )) : null}
        </TopicsContainer>
        {postForm3}
      </Box>

      <Btn.Secondary type="submit" variant="contained">
        {submitting ? 'submitting' : 'submit'}
      </Btn.Secondary>
    </Form>
  );
};

PostForm.propTypes = {
  form: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    topics: PropTypes.array
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

PostForm.defaultProps = {
  value: {
    first: '',
    last: '',
    text: '',
    topics: []
  },
  submitting: false,
};

export default PostForm;
