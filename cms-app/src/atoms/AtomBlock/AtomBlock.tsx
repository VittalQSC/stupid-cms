import styled from 'styled-components';

type Props = {
    display?: string;
    flex?: string;
};

export const AtomBlock = styled.section<Props>`
    margin: 3px;
    padding: 10px 20px;
    background: white;
    box-shadow: 0px 2px 10px rgba(24, 45, 201, 0.16);
    display: inline-block;
    border-radius: 4px;
    display: ${props => props.display || 'inline-block' };
    flex: ${props => props.flex};
`;