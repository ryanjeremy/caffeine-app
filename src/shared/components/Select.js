import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setInitialSources } from '../store/actions/sourcesActions';
import Loader from '../common/loader';
import SelectBox from './SelectBox';

class Select extends React.PureComponent {
    componentDidMount() {
        if (this.props.sources.length === 0) {
            this.props.setInitialSources();
        }
    }

    renderBoxes = () => this.props.sources.map((source, index) => (
        <SelectBox
            name={source.name}
            caffeine={source.caffeine_per_serving}
            dark={index%2!==0}
            key={index}
        />
    ));

    render() {
        return this.renderBoxes();
    }
}

Select.propTypes = {
    sources: PropTypes.array.isRequired,
    setInitialSources: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    sources: state.sources
});

const mapDispatchToProps = (dispatch) => ({
    setInitialSources: () => dispatch(setInitialSources())
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
