import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Admin.scss';

import { TABS_ENUM } from 'components/User/enums';

import styled from 'styled-components';

const Tab = styled.button`
    font-size: 20px;
    padding: 10px 60px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;
    ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Admin({ children }) {
    const [active, setActive] = useState(TABS_ENUM[0].id);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const changeTab = (tab) => {
        setActive(tab.id);
        navigate(`/admin/${tab.name}`);
    };

    useEffect(() => {
        const tabName = pathname.split('/')[2];
        const tabByName = TABS_ENUM.find((tab) => tab.name === tabName);
        setActive(tabByName.id);
    });
    return (
        <>
            <ButtonGroup>
                {TABS_ENUM.map((tab) => (
                    <Tab key={tab.id} active={active === tab.id} onClick={() => changeTab(tab)}>
                        {tab.title}
                    </Tab>
                ))}
            </ButtonGroup>
            <p />
            <div className="container">{children}</div>
        </>
    );
}
