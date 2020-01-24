import React from 'react';
import { Box } from 'rebass';
import Skeleton from 'react-loading-skeleton';
import styled from 'util/styles';

const Fallback = styled.div`
  width: 100%;
  height: 100vh;

  div {
    width: 100%;

    &:first-child {
      height: 64px;
      background-color: #004d40;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
      height: calc(100% - 64px);
      background-color: #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

const fallback = () => (
  <Fallback>
    <div>
      <div style={{ padding: '0 16px' }}>
        <Skeleton width={53} height={53} count={1} circle />
      </div>
      <div>
        <Skeleton width={80} height={48} count={1} />
      </div>
      <div>
        <Skeleton width={300} height={48} count={1} />
      </div>
    </div>
    <div>
      <Skeleton width={400} height={125} count={1} />
      <Box as="hr" width={10 / 12} 
        mx="auto"
        my={4}
        className="ZoomIn DelayStack" 
        style={{
          border: 0,
          height: '1px',
          backgroundImage: 'linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 0.75), rgba(245, 245, 245, 0))'
        }}
      />
      <Skeleton width={270} height={80} count={1} />
    </div>
  </Fallback>
);

export default fallback;
