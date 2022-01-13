import React from 'react';
import styled from 'styled-components';

import { OutlineButton } from '@atoms/AtomButton/AtomButton';
import { AtomRoute } from '@atoms/AtomRoute/AtomRoute';
import { useStore } from '@hooks/useStore';
import { observer } from 'mobx-react';

import Footer from './Footer';
import { Header } from './Header';
import { Nav } from './Nav';
import { Sign } from './Sign';

const items = [
    { id: 'Home', name: 'Home', path: '/', render: () => (<AtomRoute to="/">Home</AtomRoute>) },
    { id: 'Templates', name: 'Templates', path: '/templates', render: () => (<AtomRoute to="/templates">Templates</AtomRoute>) }];

const SignOutContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const SignOut = observer(() => {
    const { userState } = useStore();

    return (<SignOutContainer className='sign-out-container'>
        <span>Hi, {userState.username}</span>
        <OutlineButton onClick={() => (userState.signOut())}>Sign Out</OutlineButton>
    </SignOutContainer>);
});

const Content = styled.section`
    padding: 10px 20px;
    height: calc(100% - 50px);
`;

export const Headful: React.FC = observer(({ children }) => {
    const { userState } = useStore();
    
    return (<>
        <Header>
            <Nav items={items} initialSelectedItem={items[0]?.id || null}></Nav>
            {userState.username ? (<SignOut/>) : (<Sign/>)}
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
    </>);
});