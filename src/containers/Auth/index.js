/* eslint-disable no-confusing-arrow */
import AuthComponent from 'components/Auth';
import Input from 'components/UI/input';
import { AuthContext } from 'context/auth-context';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Box } from 'rebass';
import styled from 'util/styles';
import apiService from 'services/apiService';
import { checkValidity, updateObject } from 'util/share/utility';
import useHash from 'hooks/useHash';
import { motion } from 'framer-motion';

const InputContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    width: ${({ fullWidth }) => fullWidth ? '100%' : '45%'};
  }
`;

const AuthContainer = styled(motion.div)`
  background: url(/assets/images/login.jpg) no-repeat fixed;
  background-size: auto 133.33%;
  background-position: center center;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 0;
`;

const Auth = () => {
  const { t } = useTranslation('postForm');
  const [login, setLogin] = useState({
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
    email: {
      elementType: 'email',
      elementConfig: {
        type: 'text',
      },
      label: t('login.email'),
      value: '',
      validation: {
        required: true,
        emailFormat: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        valid: false,
        touched: false,
      }
    },
    password: {
      elementType: 'password',
      elementConfig: {
        type: 'password',
      },
      label: t('login.password'),
      value: '',
      validation: {
        required: true,
        minLength: 6,
        valid: false,
        touched: false,
      }
    },
    passwordConfirm: {
      elementType: 'password',
      elementConfig: {
        type: 'password',
      },
      label: t('login.confirmPW'),
      value: '',
      validation: {
        required: true,
        minLength: 6,
        valid: false,
        touched: false,
      }
    }
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const { processHash, sha1, sha256, sha384, sha512 } = useHash();

  useEffect(() => {
    if (login.first.label !== t('firstName')) {
      setLogin({
        ...login,
        first: {
          ...login.first,
          label: t('firstName')
        },
        last: {
          ...login.last,
          label: t('lastName')
        },
        email: {
          ...login.email,
          label: t('login.email')
        },
        password: {
          ...login.password,
          label: t('login.password')
        },
        passwordConfirm: {
          ...login.passwordConfirm,
          label: t('login.confirmPW')
        },
      });
    }
  });
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (e, inputId) => {
    const { target } = e;
    const { value } = target;
    let isValid = true;

    const updatedFormEle = updateObject(login[inputId], {
      value,
      validation: { ...login[inputId].validation,
        valid: checkValidity(value, login[inputId].validation),
        touched: true,
      },
    });

    const updatedForm = updateObject(login, {
      [inputId]: updatedFormEle
    });

    const { password } = updatedForm;

    processHash(password.value);

    for (const inputIds in updatedForm)
      isValid = updatedForm[inputIds].validation.valid && isValid;

    setLogin(updatedForm);
    // setLoginIsValid(isValid);
  };

  const submitHandler = useCallback(async e => {
    e.preventDefault();
    setLoading(true);
    e.persist();

    const { first, last, email, password } = login;

    if (isSignUp) {
      const newUser = {
        first: first.value,
        last: last.value,
        email: email.value,
        password: {
          sha1,
          sha256,
          sha384,
          sha512
        }
      };
  
      await apiService.createUser(newUser)
        .then(res => {
          console.log(res);

          authContext.login(newUser, isSignUp);
        })
        .catch(err => {
          console.log(err.message);
        });

    } else {
      await apiService.loginUser(email.value, password.value)
        .then(res => {
          console.log(res);
          // authContext.login(newUser, isSignUp);
        })
        .catch(err => {
          console.log(err.message);
        });
    }


    e.target.reset();
    
    setLogin({
      ...login,
      first: {
        ...login.first,
        value: ''
      },
      last: {
        ...login.last,
        value: ''
      },
      email: {
        ...login.email,
        value: ''
      },
      password: {
        ...login.password,
        value: ''
      },
      passwordConfirm: {
        ...login.passwordConfirm,
        value: ''
      },
    });
    setLoading(false);
  },
  [sha1, sha256, sha384, sha512, login, processHash]);

  const authHandler = opt => {
    if (opt === 'sign-in')
      setIsSignUp(false);

    if (opt === 'sign-up')
      setIsSignUp(true);
  };

  const loginEleArray = [];

  for (const key in login) {
    loginEleArray.push({
      id: key,
      config: login[key]
    });
  }

  const firstLast = loginEleArray.map(ele => {
    if (ele.config.label === t('firstName') || ele.config.label === t('lastName')) {
      return (
        <Box
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
            changed={e => inputChangedHandler(e, ele.id)}
          />
        </Box>
      );
    }
  });

  const pwConfirm = loginEleArray.map(ele => {
    if (isSignUp) {
      if (ele.config.label === t('login.password') || ele.config.label === t('login.confirmPW')) {
        return (
          <Box
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
              changed={e => inputChangedHandler(e, ele.id)}
            />
          </Box>
        );
      }
    } else {
      if (ele.config.label === t('login.password')) {
        return (
          <Box
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
              changed={e => inputChangedHandler(e, ele.id)}
            />
          </Box>
        );
      }
    }
  });

  const email = loginEleArray.map(ele => {
    if (ele.config.label === t('login.email')) {
      return (
        <Box
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
            changed={e => inputChangedHandler(e, ele.id)}
          />
        </Box>
      );
    }
  });

  const formAnim = {
    hidden: {
      opacity: 0,
      transition: {
        delayChildren: 0.5
      }
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  };

  return (
    <React.Fragment>
      <AuthContainer
        animate={{
          backgroundPosition: [null, '40% 35%', '55% 50%', '45% 60%'],
        }}
        transition={{
          duration: 30,
          yoyo: Infinity,
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        width={1}
        height="100vh"
      >
        <AuthComponent 
          submit={submitHandler}
          authOpt={authHandler}
          isSignUp={isSignUp}
        >
          {isSignUp && (
            <React.Fragment>
              <InputContainer
                animate="visible"
                initial="hidden"
                variants={formAnim}
              >
                {firstLast}
              </InputContainer>
              <InputContainer
                animate="visible"
                initial="hidden"
                variants={formAnim}
                fullWidth
              >
                {email}
              </InputContainer>
              <InputContainer
                animate="visible"
                initial="hidden"
                variants={formAnim}
              >
                {pwConfirm}
              </InputContainer>
            </React.Fragment>
          )}
          {!isSignUp && (
            <React.Fragment>
              <InputContainer
                animate="visible"
                initial="hidden"
                variants={formAnim}
                fullWidth
              >
                {email}
              </InputContainer>
              <InputContainer
                animate="visible"
                initial="hidden"
                variants={formAnim}
                fullWidth
              >
                {pwConfirm}
              </InputContainer>
            </React.Fragment>
          )}
        </AuthComponent>
      </Flex>
    </React.Fragment>
  );
};

export default Auth;
