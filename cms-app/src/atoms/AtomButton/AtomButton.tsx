import styled from 'styled-components';

const BaseButton = styled.button`
    padding: 10px 24px;
    font-weight: 600;
    cursor: pointer;
`;

export const Button = styled(BaseButton)`
  background: ${props => !props.disabled ? '#5468F9' : '#EBEDF5'};
  border: ${props => !props.disabled ? '1px solid #5468F9' : '1px solid #EBEDF5'};
  color: ${props => !props.disabled ? '#FFFFFF' : '#ACAFBF'};

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