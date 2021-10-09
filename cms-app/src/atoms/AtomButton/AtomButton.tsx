import styled from 'styled-components';

const BaseButton = styled.button`
    padding: 10px 24px;
    font-weight: 600;
    cursor: pointer;
`;

export const Button = styled(BaseButton)`
  background: #5468F9;
  border: 1px solid #5468F9;
  color: #FFFFFF;

  &:hover {
      background: #3F52DE;
      border: 1px solid #3F52DE;
  }

  box-shadow: 0px 2px 10px rgba(24, 45, 201, 0.16);
  border-radius: 4px;
`;

export const OutlineButton = styled(Button)`
    background: #FFFFFF;
    color: #5468F9;

    &:hover {
        background: #F5F6F9;
    }
`;