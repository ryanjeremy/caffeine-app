import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { setInitialSources } from './store/actions/sourcesActions';
import styled, { injectGlobal } from 'styled-components';
import { Container } from 'reactstrap';
import Loader from './common/loader';
import Error from './common/error';
import List from './components/List';

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
        font-size: 14px;
        line-height: 24px;
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

    hr {
        margin-bottom: 0;
    }

    .top {
        padding: 25px 25px 0 25px;

        @media (max-width: 992px) {
            padding-right: 35px;
            padding-left: 35px;
        }
    }
`;

const Redirect404 = () => <Redirect to="/" />;

class App extends React.Component {
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
                            <p>
                                {`Use this tool to determin whether you're consuming safe levels of caffeine. Simply select your
                                preferred beverage from the list below, tell us how much you'd like, and voilà! We'll give you an
                                idea of how much more you can safely consume.`}
                            </p>
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
                            <Switch>
                                <Route
                                    path="/"
                                    component={List}
                                    exact
                                />

                                <Route
                                    path="/beverage/:id"
                                    component={List}
                                    exact
                                />

                                <Route component={Redirect404} />
                            </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
