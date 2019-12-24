import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import PropTypes from 'prop-types';

const Form = styled(Flex)`
  width: 91.666%;
  max-width: 1000px;
  border-radius: 4px;
  background: linear-gradient(45deg, #222 16.666%, #e0e0e0 83.333%);
`;

const PostForm = ({ value, submitting, onSubmit, onChange }) => {
  const { first, last, text, topics } = value;

  const changeHandler = e => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    const newVal = { ...val };

    newVal[name] = val;

    onChange(newVal);
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
      >
        <Box width={5 / 12}>
          <input type="text" id="first" name="first" value={first} onChange={changeHandler} placeholder="first name" />
        </Box>
        <Box width={5 / 12}>
          <input type="text" id="last" name="last" value={last} onChange={changeHandler} placeholder="last name" />
        </Box>
      </Flex>
      <Box width={11 / 12}>
        <input type="text" id="text" name="text" value={text} onChange={changeHandler} placeholder="post text" />
      </Box>
      <Box width={11 / 12}>
        <input type="text" id="topics" name="topics" value={topics} onChange={changeHandler} placeholder="post text" />
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
  }),
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
