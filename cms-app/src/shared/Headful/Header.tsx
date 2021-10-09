import React from 'react';
import styled from "styled-components";

export const StyledHeader = styled.header`
    width: calc(100% - 100px);
    padding: 8px 50px;
    display: flex;
    justify-content: space-between;
`;

export const Header: React.FC = ({ children }) => {

    return (<StyledHeader>
        {children}
    </StyledHeader>);
};