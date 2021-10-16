import styled from "styled-components";

export const AtomInput = styled.input`
    padding: 11px 16px;
    border: 1px solid #ACAFBF;
    outline-color: #ACAFBF;
    border-radius: 4px;

    &:focus-visible {
        outline-color: #5468F9;
    }
`;

export const AtomInputError = styled.div`
    color: red;
    font-style: italic;
`;