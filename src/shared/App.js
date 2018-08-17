import * as React from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import { Container } from 'reactstrap';
import Loader from './common/loader';
import Select from './components/Select';

import 'bootstrap/dist/css/bootstrap.css';
import './style/fonts.css';

const backgroundImg = require('./assets/leaves.png');
const baseStyles = () => injectGlobal`
    body {
        background-image: url(${backgroundImg});
        font-family: 'Domine', serif;
    }
    h1, h2, h3, h4 {
        font-family: 'Montserrat', sans-serif;
    }
    p {
        letter-spacing: 1px;
    }
`;
baseStyles();

const Panel = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.75);
    width: 100%;
    padding: 25px;
    margin: 50px 0;
`;

const App = () => (
    <div>
        <Helmet>
            <title>Caffeine</title>
        </Helmet>
        <Container>
            <Panel>
                <h1>Caffeine</h1>
                <h4>It can be your maker <i className="fa fa-magic" /> or your breaker <i className="fa fa-flash" /></h4>
                <hr />
                <Select />
            </Panel>
        </Container>
    </div>
);

export default App;
