import { AtomRoute } from '@atoms/AtomRoute/AtomRoute';
import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { Header } from './Header';
import { Nav } from './Nav';
import { Sign } from './Sign';

const items = [
    { id: 'Home', name: 'Home', render: () => (<AtomRoute to="/">Home</AtomRoute>) },
    { id: 'Templates', name: 'Templates', render: () => (<AtomRoute to="/templates">Templates</AtomRoute>) }];

const Content = styled.section`
    padding: 10px 20px;
    height: calc(100% - 50px);
`;

export const Headful: React.FC = ({ children }) => {
    return (<>
        <Header>
            <Nav items={items} initialSelectedItem={items[0]?.id || null}></Nav>
            <Sign></Sign>
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
    </>);
};