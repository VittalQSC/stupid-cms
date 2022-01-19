import { useStore } from '@hooks/useStore';
import React from 'react';
import { observer } from 'mobx-react';
import { OutlineButton } from '@atoms/AtomButton/AtomButton';
import styled from 'styled-components';
import { widgets } from 'cmstmplt-vitali-shatsou';

const AddBlockButton = styled(OutlineButton)`
    padding: 40px 20px;
    width: 100%;
    border-style: dashed;
    border-width: 4px;
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
    width: 100px
    padding: 40px 20px;
    border-width: 2px;
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

const Block = ({ block }: BlockProps) => {
    const { templateStore } = useStore();

    return (<BlockContainer>
        <div>
            <AddWidgetButton>+</AddWidgetButton>
        </div>
        <RemoveBlock onClick={() => templateStore.deleteBlock(block.id)}>X</RemoveBlock>
    </BlockContainer>);
};

export const TemplateBuilder = observer(() => {
    const { templateStore } = useStore();

    return (<section>
        <BlocksList>
            {templateStore.blocks.map((block) => (<Block key={block.id} block={block}></Block>))}
        </BlocksList>
        <AddBlockButton onClick={() => templateStore.addBlock()}>Add block</AddBlockButton>
    </section>);
});