import { AtomInput } from "@atoms/AtomInput/AtomInput";
import useOutsideClick from "@hooks/useOutsideClick";
import React, { createRef, useState } from "react";
import styled from "styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const DropdownHeader = styled(AtomInput)`
    padding-right: 40px;
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;

    & .arrow {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        padding: 0 5px;
    }
`;

const DropdownList = styled.div`
    position: absolute;
    top: 40px;
    width: 100%;
    border: 1px solid #ACAFBF;
    border-radius: 4px;
`;

const DropdownOption = styled.div`
    background: #5468F9;
    color: white;
    padding: 5px 10px;
    &:hover {
        background: #3F52DE;
        border: 1px solid #3F52DE;
    }
`;

type AtomDropdownProps = {
    options: string[];
    onChange?: (value: string) => any
}

export const AtomDropdown = ({ options, onChange }: AtomDropdownProps) => {
    const ref = createRef<HTMLDivElement>();
    const [openned, setOpenned] = useState(false);
    const [selected, setSelected] = useState('')
    useOutsideClick(() => { openned && setOpenned(false); }, ref);

    function onDropdownOptionClick(option: string) {
        setSelected(option);
        setOpenned(false);
        onChange && onChange(option);
    }

    return (<DropdownContainer ref={ref}>
        <DropdownHeader onClick={() => setOpenned(!openned)} value={selected} readOnly={true}></DropdownHeader>
        <span className="arrow" onClick={() => setOpenned(!openned)}>
            {openned ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
        {openned && (<DropdownList>
            {options && options.map(o => (<DropdownOption key={o} onClick={() => onDropdownOptionClick(o)}>{o}</DropdownOption>))}
        </DropdownList>)}
    </DropdownContainer>);
};