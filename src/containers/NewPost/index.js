import React, { useState, useEffect } from 'react';
import PostForm from 'components/PostForm';
import apiService from 'services/apiService';
import { updateObject, checkValidity } from 'util/share/utility';
import { useTranslation } from 'react-i18next';
import { Flex } from 'rebass';

const NewPost = React.memo(() => {
  const { t } = useTranslation('postForm');
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    first: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: t('firstName'),
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
      label: t('lastName'),
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
      label: t('postContent'),
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
      label: t('topics'),
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

  useEffect(() => {
    if (form.first.label !== t('firstName')) {
      setForm({
        ...form,
        first: {
          ...form.first,
          label: t('firstName')
        },
        last: {
          ...form.last,
          label: t('lastName')
        },
        content: {
          ...form.content,
          label: t('postContent')
        },
        topics: {
          ...form.topics,
          label: t('topics')
        },
      });
    }
  });

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
    const topicsArray = id === t('topics') ?
      updatedFormEle.value.search(',') !== -1 ?
        updatedFormEle.value.split(',') :
        updatedFormEle.value.split(' ') 
      : null;

    let updatedForm = updateObject(form, {
      [inputId]: updatedFormEle
    });

    if (id === t('topics')) {
      updatedForm = updateObject(form, {
        [inputId]: updatedFormEle,
        topics: id === t('topics') && {
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
    <PostForm 
      form={form}
      submitting={submitting}
      onChange={inputChangedHandler}
      onSubmit={submitHandler} 
      onDelete={deleteTopicHandler}
    />
  );
});

export default NewPost;
