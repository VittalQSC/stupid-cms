import { useStore } from '@hooks/useStore';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react';
import { OutlineButton } from '@atoms/AtomButton/AtomButton';
import styled from 'styled-components';
import { widgets } from 'cmstmplt-vitali-shatsou';

const AddBlockButton = styled(OutlineButton)`
    padding: 40px 20px;
    width: 100%;
    border-style: dashed;
    border-width: 4px;

    &:hover {
        border-width: 4px;
    }
`;

const BlocksList = styled.ul`
    list-style: none;
    padding: 0;
`;

const BlockContainer = styled.li`
    border: dashed 2px rgba(211,211,211, .5);
    justify-content: space-between;
    padding: 40px 20px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
`;

const AddWidgetButton = styled(OutlineButton)`
    display: inline-block;
    width: 100px;
    padding: 40px 20px;
    border-width: 2px;
`;

type WidgetProps = {
    edit: boolean
};

const WidgetPlaceholder = styled(OutlineButton)`
    color: darkgrey;
    display: inline-block;
    width: 100px;
    padding: 40px 20px;
    border-width: 2px;

    border-color: ${(props: WidgetProps) => props.edit ? 'red' : 'darkgrey'}
`;

const RemoveBlock = styled.span`
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

type BlockProps = {
    block: widgets.Block
};

const BlockList = styled.div`
    display: flex;
    gap: 5px;
`;

const Widget = styled(WidgetPlaceholder)`
    color: green;
    border-color: ${(props: WidgetProps) => props.edit ? 'orange' : 'green'}
`;

const Block = observer(({ block }: BlockProps) => {
    const { templateStore } = useStore();

    return (<BlockContainer>
        <BlockList>
            {templateStore.getWidgetIds(block.id).map(id => (
                !templateStore.widgets[id] 
                    ? (<WidgetPlaceholder key={id} edit={templateStore.edit === id} onClick={() => templateStore.setEditWidget(id)}>
                        +
                    </WidgetPlaceholder>)
                    : (<Widget key={id} edit={templateStore.edit === id} onClick={() => templateStore.setEditWidget(id)}></Widget>)
            ))}
            <AddWidgetButton onClick={() => (templateStore.addWidgetToBlock(block.id, uuidv4()))}>+</AddWidgetButton>
        </BlockList>
        <RemoveBlock onClick={() => templateStore.deleteBlock(block.id)}>X</RemoveBlock>
    </BlockContainer>);
});

export const TemplateBuilder = observer(() => {
    const { templateStore } = useStore();

    return (<section>
        <BlocksList>
            {templateStore.blocks.map((block) => (<Block key={block.id} block={block}></Block>))}
        </BlocksList>
        <AddBlockButton onClick={() => templateStore.addBlock()}>Add block</AddBlockButton>
    </section>);
});