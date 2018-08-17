import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 25px;
    text-align: center;
    background-color: ${props => props.dark ? `rgb(250, 250, 250)`:`inherit`};

    &:hover {
        background-color: rgb(245, 245, 245);
    }

    &:active {
        background-color: rgb(240, 240, 240);
    }

    .sub-text {
        font-size: 12px;
        margin-bottom: 0;
    }
`;

const SelectBox = ({ name, caffeine, dark, onClick }) => (
    <Wrapper dark={dark}>
        <h3>{name}</h3>
        <p className="sub-text">{caffeine}mg per serving</p>
    </Wrapper>
);

export default SelectBox;
