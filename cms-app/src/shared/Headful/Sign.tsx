import React from "react";
import styled from "styled-components";

// atoms
import { Button, OutlineButton } from "@atoms/AtomButton/AtomButton";
import { AtomRoute } from "@atoms/AtomRoute/AtomRoute";

const SignContainer = styled.div`
    & button:not(:last-child) {
        margin-right: 10px;
    }
`;

export const Sign: React.FC = () => {
    return (<SignContainer>
        <Button>
            <AtomRoute to="sign-in">
                Sign in
            </AtomRoute>
        </Button>
        <OutlineButton>
            <AtomRoute to="sign-up">
                Sign up
            </AtomRoute>
        </OutlineButton>
    </SignContainer>);
};