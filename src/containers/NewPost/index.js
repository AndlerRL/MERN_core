import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import PostForm from 'components/PostForm';
import apiService from 'services/apiService';
import { updateObject, checkValidity } from 'util/share/utility';
import { useTranslation } from 'react-i18next';
import { AuthContext } from 'context/auth-context';

const NewPost = React.memo(({ history }) => {
  const { t } = useTranslation('postForm');
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [form, setForm] = useState({
    first: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: t('firstName'),
      value: user.first,
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
      value: user.last,
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
    title: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
      },
      label: t('title'),
      value: '',
      validation: {
        required: true,
        valid: false,
        touched: false,
      }
    },
    content: [
      {
        imgContent: {
          elementType: 'text',
          elementConfig: {
            type: 'text',
          },
          label: t('imgContent'),
          value: 'https://via.placeholder.com/1920x720.png?text=Content+Image+PlaceHolder',
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
        }
      }
    ],
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
  const [contentLength, setContentLength] = useState(1);

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
  }, [t, setForm]);

  const inputChangedHandler = (e, inputId, key) => {
    const { target } = e;
    const { value, id } = target;
    let isValid = true;

    const updatedFormEle = inputId !== 'content' && updateObject(form[inputId], {
      value,
      validation: { 
        ...form[inputId].validation,
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
      [inputId]: updatedFormEle,
    });
    
    if (id === `${t('postContent')}_${key}` || id === `${t('imgContent')}_${key}`) {
      updatedForm = updateObject(form, {
        [inputId]: updatedFormEle,
        // eslint-disable-next-line array-callback-return
        content: form.content.map((c, i) => {
          if ((key - 1) === i) {
            return {
              imgContent: id === `${t('imgContent')}_${key}` ? {
                ...c.imgContent,
                value,
                validation: {
                  ...c.imgContent.validation,
                  valid: checkValidity(value, c.imgContent.validation),
                  touched: true
                }
              } : {
                ...c.imgContent
              },
              content: id === `${t('postContent')}_${key}` ? {
                ...c.content,
                value,
                validation: {
                  ...c.content.validation,
                  valid: checkValidity(value, c.content.validation),
                  touched: true
                }
              } : {
                ...c.content
              }
            };
          } else if ((key - 1 !== i)) {
            return { ...c };
          }
        }),
      });
    }

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
    for (let inputIds in updatedForm) {
      // eslint-disable-next-line no-nested-ternary
      isValid = updatedForm[inputIds].validation ? 
        updatedForm[inputIds].valid && isValid 
        : updatedForm.content ? 
          updatedForm.content.map(c => (
            c.imgContent.validation.valid && c.content.validation.valid
          )) && isValid : isValid;
    }

    setForm(updatedForm);
    setFormIsValid(isValid);
  };

  const submitHandler = async e => {
    e.preventDefault();
    e.persist();

    setSubmitting(true);

    const { first, last, content, topics, title } = form;
    const contentVals = content.map(c => ({
      imgContent: c.imgContent.value,
      content: c.content.value
    }));
    const { id } = user;

    const newPost = {
      first: first.value,
      last: last.value,
      title: title.value,
      content: contentVals,
      topics: topics.value.filter(t => t !== ''),
      authorId: id
    };

    await apiService.createPost(newPost)
      .then(res => {
        // console.log(res);
        e.target.reset();
        setSubmitting(false);
        history.push('/posts');
      })
      .catch(err => console.log(err));
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

  const addContentHandler = () => {
    if (form.content.length >= 4) 
      return;

    setForm({
      ...form,
      content: [
        ...form.content,
        {
          imgContent: {
            elementType: 'text',
            elementConfig: {
              type: 'text',
            },
            label: t('imgContent'),
            value: 'https://via.placeholder.com/1920x720.png?text=Content+Image+PlaceHolder',
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
          }
        }
      ]
    });
  };

  return (
    <PostForm 
      form={form}
      submitting={submitting}
      onChange={inputChangedHandler}
      onSubmit={submitHandler} 
      onDelete={deleteTopicHandler}
      onAdd={addContentHandler}
    />
  );
});

NewPost.propTypes = {
  history: PropTypes.object
};

export default NewPost;
