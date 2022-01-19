import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@hooks/useStore';
import styled from 'styled-components';
import { AtomDropdown } from '@atoms/AtomDropdown/AtomDropdown';
import { widgetTypes } from 'cmstmplt-vitali-shatsou';

const NoActiveWidgetContainer = styled.section`
    height: 100%;
    width: 100%;
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const WidgetBuilder = observer(() => {
    const { templateStore } = useStore();

    if (!templateStore.edit) {
        return (<NoActiveWidgetContainer>No active widget to edit</NoActiveWidgetContainer>);
    }

    return (<section>
        <h4>
            Here you can edit selected widget
        </h4>
        <AtomDropdown options={Object.values(widgetTypes)} onChange={(option) => {console.log('selected', option);}}></AtomDropdown>
    </section>);
});