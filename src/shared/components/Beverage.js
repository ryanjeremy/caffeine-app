import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BeverageForm from './BeverageForm';

const Wrapper = styled.div`
    width: 100%;
    padding: 20px 25px 25px 25px;
    text-align: center;

    .sub-text {
        font-size: 12px;
        margin-bottom: 0;
    }

    .return {
        text-align: right;
        font-size: 14px;
        display: block;

        @media (max-width: 992px) {
            text-align: center;
            margin-bottom: 15px;
        }
    }
`;

const Beverage = (props) => (
    <Wrapper>
        <Link to="/" className="return">
            <i className="fa fa-arrow-left" /> Return to List
        </Link>
        <h3>{props.source.name}</h3>
        <p className="sub-text">
            {`${props.source.caffeine_per_serving}mg per ${
                props.source.servings > 1
                    ? `serving, ${props.source.servings} servings per ${props.source.type}`
                    : props.source.type
            }`}
        </p>
        <BeverageForm
            source={props.source}
        />
    </Wrapper>
);

Beverage.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        servings: PropTypes.number,
        caffeine_per_serving: PropTypes.number,
    }).isRequired,
};

export default Beverage;
