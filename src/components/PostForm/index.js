/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'rebass';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Btn } from 'components/UI/btn';
import { Chip } from '@material-ui/core';
import Input from '../UI/input';
import { Icons } from '../UI/icons';

const Header = styled(Flex)`
  min-height: 33vh;
  background-color: #222;
  color: #f5f5f5;
`;

const Form = styled(Flex)`
  width: 91.666%;
  max-width: 1000px;
  border-radius: 4px;
  background: linear-gradient(45deg, #2222 16.666%, #7772 83.333%);
  margin: 0 auto;
  padding: 16px 32px;

  > div {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TopicsContainer = styled(Flex)`
  position: absolute;
  bottom: 42px;
  z-index: 1;

  + div.MuiFormControl-root > div.MuiInputBase-root > input {
    height: 32px;
    color: ${({ topicsVal }) => (topicsVal.length ? 'transparent' : 'initial')};
  }
`;

const PostForm = React.memo(({ form, submitting, onSubmit, onChange, onDelete }) => {
  const { t } = useTranslation('postForm');
  const formEleArray = [];

  for (const key in form) {
    formEleArray.push({
      id: key,
      config: form[key]
    });
  }

  const postForm1 = useCallback(
    formEleArray.map(ele => (
      ele.config.label === t('firstName') || ele.config.label === t('lastName') ?
        <Box
          width={5 / 12}
          key={ele.id}
        >
          <Input
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
    )),
    [form]
  );

  const postForm2 = useCallback(
    formEleArray.map(ele => (
      ele.config.label === t('postContent') ?
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
    )),
    [form]
  );

  const postForm3 = useCallback(
    formEleArray.map(ele => (
      ele.config.label === t('topics') ?
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
    )),
    [form]
  );
  
  return (
    <React.Fragment>
      <Header
        alignItems="center"
        justifyContent="center"
        width={1}
        flexDirection="column"
        mb={5}
      >
        <Text as="h1"
          letterSpacing={3}
          fontWeight="normal"
        >
          {t('reviewForm')}
        </Text>
      </Header>
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
          <TopicsContainer topicsVal={form.topics.value}>
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
          <Text as="span"
            fontWeight="lighter"
            fontSize={1}
          >
            {t('topicsHint')}
          </Text>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          width={1}
          mt={4}
        >
          <Btn.Secondary type="submit" variant="contained" size="large">
            {submitting ? t('submitting') : t('submit')}
          </Btn.Secondary>
        </Flex>
      </Form>
    </React.Fragment>
  );
});

PostForm.propTypes = {
  form: PropTypes.shape({
    first: PropTypes.object.isRequired,
    last: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    topics: PropTypes.object.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

PostForm.defaultProps = {
  submitting: false,
};

export default PostForm;
