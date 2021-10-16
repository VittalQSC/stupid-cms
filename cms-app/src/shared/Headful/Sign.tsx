import React from "react";
import { Button, OutlineButton } from "@atoms/AtomButton/AtomButton";

import styled from "styled-components";
import { AtomRoute } from "@atoms/AtomRoute/AtomRoute";

const SignContainer = styled.div`
    & button:not(:last-child) {
        margin-right: 10px;
    }
`;

export const Sign: React.FC = () => {
    return (<SignContainer>
        <Button>Sign in</Button>
        <OutlineButton>
            <AtomRoute to="sign-up">
                Sign up
            </AtomRoute>
        </OutlineButton>
    </SignContainer>);
};