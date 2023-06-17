import styled from 'styled-components';
import { Space } from 'antd';

export const CardContent = styled(Space)`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: auto;
  flex-direction: column;
  align-items: stretch;
  background-color: #eeeeee;
  border: 1px solid #b2b2b2;
  padding: 24px 48px;
  border-radius: 16px;

  h1 {
    text-align: center;
    margin: 24px 0 36px;
  }
`;
