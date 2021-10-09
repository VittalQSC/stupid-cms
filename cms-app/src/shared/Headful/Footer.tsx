import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    background: #303240;
    height: 50;
    color: #FFFF;
    padding: 8px 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

function Footer() {
    return (<FooterContainer>Footer @vitali_shatsou</FooterContainer>);
}

export default Footer;