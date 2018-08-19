import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
    margin: 25px 0;

    p {
        color: rgb(154, 26, 26);
    }
    a {
        font-size: 14px;
    }
`;

const Error = ({ error, linkText, linkAction }) => (
    <Wrapper>
        <p>{error}</p>
        {linkText && (
            <a href="#" onClick={linkAction}>{linkText}</a>
        )}
    </Wrapper>
);

Error.propTypes = {
    error: PropTypes.string.isRequired,
    linkText: PropTypes.string,
    linkAction: PropTypes.func
};

export default Error;
