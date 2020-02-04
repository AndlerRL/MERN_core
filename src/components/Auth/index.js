/* eslint-disable no-confusing-arrow */
/* eslint-disable react/display-name */
import React from 'react';
import { Btn } from 'components/UI/btn';
import { Flex, Box } from 'rebass';
import styled, { themeGet } from 'util/styles';

const AuthContainer = styled(Flex)`
  background-color: ${themeGet('colors.secondary.100')};
  position: relative;
  z-index: 1;
  transition: height 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);

  > div {

    &:first-of-type {
      height: 80px;
      background-color: ${themeGet('colors.primary.100')};

      > div
        height: 100%;

        > div {
          height: 100%;
          cursor: pointer;
          transition: background-color 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);

          &:first-child {
            background-color: ${({ isSignUp }) => !isSignUp ? themeGet('colors.secondary.100') : 'transparent'};
          }

          &:last-child {
            border-left: 1px solid ${themeGet('colors.primary.200')};
            background-color: ${({ isSignUp }) => isSignUp ? themeGet('colors.secondary.100') : 'transparent'};
          }
        }  
      }
    }
  }
`;

const FormContainer = styled.form`
  padding: 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > button {
    margin-top: 2.5rem;
  }
`;

const Auth = React.memo(({ children, submit, authOpt, isSignUp }) => {
  
  return (
    <AuthContainer
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width={[10 / 12, 6 / 12, 6 / 12, 5 / 12]}
      mx="auto"
      isSignUp={isSignUp}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width={1}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          width={1 / 2}
          onClick={() => authOpt('sign-in')}
        >
          Sign In
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          width={1 / 2}
          onClick={() => authOpt('sign-up')}
        >
          Sign Up
        </Flex>
      </Flex>
      <Box as="hr" width={1} 
        mx="auto"
        className="ZoomIn DelayStack" 
        style={{
          border: 0,
          height: '1px',
          backgroundImage: 'linear-gradient(to right, rgba(240, 244, 195, 0), rgba(128, 203, 196, 0.75), rgba(240, 244, 195, 0))'
        }}
      />
      <FormContainer
        onSubmit={submit}
      >
        {children}
        <Btn.Secondary
          type="submit"
          variant="contained"
          size="large"
        >
          SUBMIT
        </Btn.Secondary>
      </FormContainer>
    </AuthContainer>
  );
});

export default Auth;
