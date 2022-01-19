import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import { NavItem } from './Headful.d';

export const StyledNav = styled.nav`
    display: inline-flex;
    justify-content: space-between;

    & ul {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    & ul li {
        display: flex;
        cursor: pointer;
        flex-direction: column;
        justify-content: center;
    }

    & ul li:not(:last-child) {
        margin-right: 28px;
    }

    & ul li.selected, & ul li.selected * {
        color: #5468F9;
    }
`;

export interface NavProps {
    items: NavItem[],
}

export const Nav: React.FC<NavProps> = ({ items }) => {
    const location = useLocation();
    const [selected, select] = useState<string | null>(items.find(item => item.path === location.pathname)?.id || null);

    useEffect(() => {
        select(items.find(item => item.path === location.pathname)?.id || null);
    }, [location]);

    return (<StyledNav>
        <ul>
            { items.map((item: NavItem) => (
                    <li className={`${selected === item.id ? 'selected' : ''}`}
                        onClick={() => {select(item.id)}}
                        key={item.id}
                    >
                        {item.render ? item.render() : item.name}
                    </li>)
                ) 
            }
        </ul>
    </StyledNav>);
};