import { OutlineButton } from '@atoms/AtomButton/AtomButton';
import styled from 'styled-components';
import { widgets } from 'cmstmplt-vitali-shatsou';
import React from 'react';

export const AddBlockButton = styled(OutlineButton)`
    padding: 40px 20px;
    width: 100%;
    border-style: dashed;
    border-width: 4px;

    &:hover {
        border-width: 4px;
    }
`;

export const BlocksList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const BlockContainer = styled.li`
    border: dashed 2px rgba(211,211,211, .5);
    justify-content: space-between;
    padding: 40px 20px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
`;

export const AddWidgetButton = styled(OutlineButton)`
    display: inline-block;
    width: 100px;
    padding: 40px 20px;
    border-width: 2px;
`;

export type WidgetProps = {
    edit: boolean
};

export const WidgetPlaceholder = styled(OutlineButton)`
    flex-grow: 1;
    color: darkgrey;
    display: inline-block;
    width: 100px;
    padding: 40px 20px;
    border-width: 2px;

    border-color: ${(props: WidgetProps) => props.edit ? 'green' : 'darkgrey'}
`;

export const RemoveBlock = styled.span`
    position: absolute;
    top: -15px;
    right: -15px;
    border-radius: 50%;
    background: white;
    border: 1px solid lightgrey;
    display: inline-flex;
    width: 30px;
    height: 30px;
    color: lightgrey;
    opacity: 0.5;
    justify-content: center;
    align-items: center;


    &:hover {
        opacity: 1;
    }

    &:active {
        background: lightgrey;
        color: white;
    }
`;

export type BlockProps = {
    block: widgets.Block
};

export const BlockList = styled.div`
    display: flex;
    gap: 5px;
`;

export const Widget = styled(WidgetPlaceholder)`
    color: green;
    border-color: ${(props: WidgetProps) => props.edit ? 'orange' : 'green'}
`;

const HeaderWidgetPlaceholderContainer = styled(WidgetPlaceholder)`
    & .text {
        margin: 10px;
        border: 5px solid black;
        width: calc(60% - 20px);
        display: inline-block;
        border-radius: 4px;
    }
`;

export const HeaderWidgetPlaceholder = (props: WidgetProps) => {
    return <HeaderWidgetPlaceholderContainer {...props}>
        <span className='text'></span>
    </HeaderWidgetPlaceholderContainer>;
};

export const WidgetsContainer = styled.div`
    display: flex;
    gap: 5px;
    width: 100%;
`;

export const BlockListContainer = styled(BlockList)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;