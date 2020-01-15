import React, { useState } from 'react';
import PostForm from 'components/PostForm';
import apiService from 'services/apiService';
import { updateObject, checkValidity } from 'util/share/utility';
import { Flex } from 'rebass';

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    first: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: 'First',
      value: '',
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
    last: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: 'Last',
      value: '',
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
    content: {
      elementType: 'textarea',
      elementConfig: {
        type: 'textarea',
      },
      label: 'Post Content',
      value: '',
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
    topics: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: 'Topics',
      value: '',
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputChangedHandler = (e, inputId) => {
    const { target } = e;
    const { value, id } = target;
    let isValid = true;

    const updatedFormEle = updateObject(form[inputId], {
      value,
      validation: { ...form[inputId].validation,
        valid: checkValidity(value, form[inputId].validation),
        touched: true,
      },
    });

    // eslint-disable-next-line no-nested-ternary
    const topicsArray = id === 'Topics' ?
      updatedFormEle.value.search(',') !== -1 ?
        updatedFormEle.value.split(',') :
        updatedFormEle.value.split(' ') 
      : null;

    let updatedForm = updateObject(form, {
      [inputId]: updatedFormEle
    });

    if (id === 'Topics') {
      updatedForm = updateObject(form, {
        [inputId]: updatedFormEle,
        topics: id === 'Topics' && {
          ...updatedFormEle,
          value: topicsArray
        }
      });
    }

    // eslint-disable-next-line prefer-const
    for (let inputIds in updatedForm)
      isValid = updatedForm[inputIds].validation.valid && isValid;

    setForm(updatedForm);
    setFormIsValid(isValid);
  };

  const submitHandler = async e => {
    e.preventDefault();

    setSubmitting(true);

    e.persist();

    const { first, last, content, topics } = form;

    const newPost = {
      first: first.value,
      last: last.value,
      text: content.value,
      topics: topics.value.filter(t => t !== '')
    };

    const res = await apiService.createPost(newPost);
    const newPosts = [...posts, res.data];

    e.target.reset();

    setPosts(newPosts);
    setSubmitting(false);
  };

  const deleteTopicHandler = topic => {
    const newTopicArray = form.topics.value.filter(t => t !== topic);

    const updatedForm = updateObject(form, {
      topics: {
        ...form.topics,
        value: newTopicArray
      }
    });

    setForm(updatedForm);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      pt={6}
      width={1}
    >
      <PostForm 
        form={form}
        submitting={submitting}
        onChange={inputChangedHandler}
        onSubmit={submitHandler} 
        onDelete={deleteTopicHandler}
      />
    </Flex>
  );
};

export default NewPost;
