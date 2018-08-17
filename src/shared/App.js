import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { setInitialSources } from './store/actions/sourcesActions';
import styled, { injectGlobal } from 'styled-components';
import { Container } from 'reactstrap';
import Loader from './common/loader';
import Error from './common/error';
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
    a {
        color: rgb(32, 185, 214);
    }
    a:hover {
        text-decoration: none;
        color: rgb(30, 167, 193);
    }
`;
baseStyles();

const Panel = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.75);
    width: 100%;
    margin: 50px 0;

    .top {
        padding: 25px 25px 0 25px;
    }
`;

class App extends React.PureComponent {
    componentDidMount() {
        if (this.props.sources.length === 0) {
            this.props.setInitialSources();
        }
    }

    reload = () => {
        this.props.setInitialSources();
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Caffeine</title>
                </Helmet>
                <Container>
                    <Panel>
                        <div className="top">
                            <h1>Caffeine <i className="fa fa-coffee" /></h1>
                            <h4>It can be your maker <i className="fa fa-magic" /> or your breaker <i className="fa fa-flash" /></h4>
                            <hr />
                        </div>
                        {this.props.loading ?
                            <Loader />
                        : this.props.error ?
                            <Error
                                error={this.props.error}
                                linkText="Try Again"
                                linkAction={this.reload}
                            />
                        : (
                            <>
                                <Route
                                    path="/"
                                    component={Select}
                                    exact
                                />
                            </>
                        )}
                    </Panel>
                </Container>
            </>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    sources: PropTypes.array.isRequired,
    setInitialSources: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loading: state.app.loading,
    error: state.app.error,
    sources: state.sources
});

const mapDispatchToProps = {
    setInitialSources,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
