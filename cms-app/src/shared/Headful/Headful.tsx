import { AtomRoute } from '@atoms/AtomRoute/AtomRoute';
import { useStore } from '@hooks/useStore';
import { observer } from 'mobx-react';
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

export const Headful: React.FC = observer(({ children }) => {
    const { userState } = useStore();
    
    return (<>
        <Header>
            <Nav items={items} initialSelectedItem={items[0]?.id || null}></Nav>
            {userState.username ? (<span>Hi, {userState.username}</span>) : (<Sign></Sign>)}
            {/* FIX IT */}
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
    </>);
});