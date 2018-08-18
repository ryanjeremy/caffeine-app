import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 25px;
    text-align: center;
    background-color: ${(props) => (props.dark ? `#f5f5f5` : `transparent`)};

    &:hover {
        background-color: #f0f0f0;
    }

    &:active {
        background-color: #ebebeb;
    }

    .sub-text {
        font-size: 12px;
        margin-bottom: 0;
    }
`;

const Option = (props) => (
    <Wrapper dark={props.dark} onClick={props.onClick}>
        <h3>{props.source.name}</h3>
        <p className="sub-text">
            {`${props.source.caffeine_per_serving}mg per ${
                props.source.servings > 1
                    ? `serving, ${props.source.servings} servings per ${props.source.type}`
                    : props.source.type
            }`}
        </p>
    </Wrapper>
);

Option.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        servings: PropTypes.number,
        caffeine_per_serving: PropTypes.number,
    }).isRequired,
    dark: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Option;
