import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { widgetTypes } from 'cmstmplt-vitali-shatsou';

// atoms
import { AtomDropdown } from '@atoms/AtomDropdown/AtomDropdown';

// hooks
import { useStore } from '@hooks/useStore';

import { HeaderWidgetForm } from './HeaderWidget.Form';

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
    const [widgetTypeValue, setWidgetTypeValue] = useState('');
    useEffect(() => {
        const widget = templateStore.editWidget;
        setWidgetTypeValue(widget ? widget.type : '');
    }, [templateStore.edit]);

    if (!templateStore.edit) {
        return (<NoActiveWidgetContainer>No active widget to edit</NoActiveWidgetContainer>);
    }

    return (<section>
        <h4>
            Here you can edit selected widget
        </h4>
        <AtomDropdown options={Object.values(widgetTypes)} value={widgetTypeValue} onChange={(option) => {setWidgetTypeValue(option);}}></AtomDropdown>
        {
            (widgetTypeValue === widgetTypes.HEADER_WIDGET_TYPE) && (<HeaderWidgetForm />)
        }
    </section>);
});