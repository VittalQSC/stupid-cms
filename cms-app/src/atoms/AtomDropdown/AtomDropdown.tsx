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
    margin-bottom: 30px;

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
    value: string;
    onChange?: (value: string) => any;
}

export const AtomDropdown = ({ options, value, onChange }: AtomDropdownProps) => {
    const ref = createRef<HTMLDivElement>();
    const [openned, setOpenned] = useState(false);
    useOutsideClick(() => { openned && setOpenned(false); }, ref);

    function onDropdownOptionClick(option: string) {
        onChange && onChange(option);
        setOpenned(false);
    }

    return (<DropdownContainer ref={ref}>
        <DropdownHeader onClick={() => setOpenned(!openned)} value={value} readOnly={true}></DropdownHeader>
        <span className="arrow" onClick={() => setOpenned(!openned)}>
            {openned ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
        {openned && (<DropdownList>
            {options && options.map(o => (<DropdownOption key={o} onClick={() => onDropdownOptionClick(o)}>{o}</DropdownOption>))}
        </DropdownList>)}
    </DropdownContainer>);
};