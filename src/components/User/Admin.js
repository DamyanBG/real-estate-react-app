import React, { useState } from 'react';
import styled from 'styled-components';
import './Admin.scss';
import Users from './components/Users';
import Homes from './components/Homes';
import Lands from './components/Lands';

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

const types = ['Manage users', 'Manage homes', 'Manage lands'];

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Admin() {
    const [active, setActive] = useState(types[0]);
    return (
        <>
            <ButtonGroup>
                {types.map((type) => (
                    <Tab key={type} active={active === type} onClick={() => setActive(type)}>
                        {type}
                    </Tab>
                ))}
            </ButtonGroup>
            <p />
            {active === 'Manage users' ? <Users /> : active === 'Manage homes' ? <Homes /> : <Lands />}
        </>
    );
}
