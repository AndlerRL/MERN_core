/* eslint-disable newline-per-chained-call */
import { useReducer } from 'react';
import { createHash } from 'crypto';

const initState = {
  md5: '',
  sha1: '',
  sha256: '',
  sha384: '',
  sha512: '',
};

const hashReducer = (state, action) => {
  switch (action.type) {
  case 'PROCESS_VAL':
    return {
      md5: createHash('md5').update(action.md5, 'utf8').digest('hex'),
    };
  case 'PROCESS_HASH':
    return {
      sha1: createHash('sha1').update(state.md5, 'utf8').digest('hex'),
      sha256: createHash('sha256').update(state.md5, 'utf8').digest('hex'),
      sha384: createHash('sha384').update(state.md5, 'utf8').digest('base64'),
      sha512: createHash('sha512').update(state.md5, 'utf8').digest('base64'),
    };
  default: 
    throw new Error('You shouldn\'t be here...');
  }
};

const useHash = () => {
  const [hashState, dispatch] = useReducer(hashReducer, initState);

  const processHash = value => {
    dispatch({
      type: 'PROCESS_VAL',
      md5: value
    });

    return dispatch({
      type: 'PROCESS_HASH'
    });
  };
  
  return {
    processHash,
    sha1: hashState.sha1,
    sha256: hashState.sha256,
    sha384: hashState.sha384,
    sha512: hashState.sha512
  };
};

export default useHash;
