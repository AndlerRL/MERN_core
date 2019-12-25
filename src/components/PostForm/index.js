/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import PropTypes from 'prop-types';
import { updateObject } from 'util/share/utility.js';

const Form = styled(Flex)`
  width: 91.666%;
  max-width: 1000px;
  border-radius: 4px;
  background: linear-gradient(45deg, #222 16.666%, #777 83.333%);

  > div {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Input = styled.input`
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const PostForm = ({ value, submitting, onSubmit, onChange }) => {
  const { first, last, text, topics } = value;
  
  const changeHandler = e => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    const newVal = { ...value };
    
    newVal[name] = val;

    const { first, last, text, topics } = newVal;
    const splitted = name === 'topics' ? 
      topics.search(' ') !== -1 ? 
        topics.split(' ') 
        : topics.split(',') 
      : null;
    const topicsArray = name === 'topics' ? splitted : [];

    const updatedPostVal = updateObject(newVal, {
      first,
      last,
      text,
      topics: topicsArray
    });

    onChange(updatedPostVal);
  };
  
  return (
    <Form as="form"
      onSubmit={onSubmit}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex 
        width={11 / 12}
        alignItems="center"
        justifyContent="space-between"
        my={3}
      >
        <Box width={5 / 12}>
          <Input type="text" id="first" name="first" value={first} onChange={changeHandler} placeholder="first name" />
        </Box>
        <Box width={5 / 12}>
          <Input type="text" id="last" name="last" value={last} onChange={changeHandler} placeholder="last name" />
        </Box>
      </Flex>
      <Box width={11 / 12} my={3}>
        <Input type="text" id="text" name="text" value={text} onChange={changeHandler} placeholder="post text" />
      </Box>
      <Box width={11 / 12} my={3}>
        <Input type="text" id="topics" name="topics" value={topics} onChange={changeHandler} placeholder="topics" />
      </Box>

      <button type="submit">
        {submitting ? 'submitting' : 'submit'}
      </button>
    </Form>
  );
};

PostForm.propTypes = {
  value: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
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
