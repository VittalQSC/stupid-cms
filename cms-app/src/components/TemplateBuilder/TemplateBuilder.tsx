import { useStore } from '@hooks/useStore';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react';
import { AddBlockButton, AddWidgetButton, BlockContainer, BlockListContainer, BlockProps, BlocksList, HeaderWidgetPlaceholder, RemoveBlock, Widget, WidgetPlaceholder, WidgetsContainer } from './TemplateBuilder.Styles';

const Block = observer(({ block }: BlockProps) => {
    const { templateStore } = useStore();

    return (<BlockContainer>
        <BlockListContainer>
            <WidgetsContainer>
                {templateStore.getWidgetIds(block.id).map(id => (
                    !templateStore.widgets[id] 
                        ? (<WidgetPlaceholder key={id} edit={templateStore.edit === id} onClick={() => templateStore.setEditWidget(id)}>
                            +
                        </WidgetPlaceholder>)
                        : (<HeaderWidgetPlaceholder key={id} edit={templateStore.edit === id} onClick={() => templateStore.setEditWidget(id)}></HeaderWidgetPlaceholder>)
                ))}
            </WidgetsContainer>
            <AddWidgetButton onClick={() => (templateStore.addWidgetToBlock(block.id, uuidv4()))}>+</AddWidgetButton>
        </BlockListContainer>
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