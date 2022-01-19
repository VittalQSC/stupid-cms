import React from 'react';
import { useStore } from '@hooks/useStore';
import { observer } from 'mobx-react';
import styled from 'styled-components';

// atoms
import { AtomBlock } from '@atoms/AtomBlock/AtomBlock';
import { TemplateBuilder } from '@components/TemplateBuilder/TemplateBuilder';

const FlexWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 5px;
`;

export const HomePage = observer(() => {
    const { userStore } = useStore();

    if (!userStore.isLoggedIn) {
        return (<main>You should be logged in to create templates!</main>);
    }

    return (<main>
        <AtomBlock display='block'>
            Welcome {userStore.username}! On this page you can create your templates.
        </AtomBlock>
        <FlexWrapper>
            <AtomBlock flex='1'>SideBar</AtomBlock>
            <AtomBlock flex='2'>
                <TemplateBuilder></TemplateBuilder>
            </AtomBlock>
        </FlexWrapper>
    </main>);
});