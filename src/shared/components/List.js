import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../common/loader';
import Option from './Option';
import Beverage from './Beverage';

class List extends React.PureComponent {
    componentWillMount() {
        this.verifyParam();
    }

    verifyParam = () => {
        const beverageId = parseInt(this.props.match.params.id);
        if (!beverageId) {
            return;
        }
        if (Number.isInteger(beverageId)) {
            for (let i = 0; i < this.props.sources.length; i ++) {
                if (this.props.sources[i].id === beverageId) {
                    return;
                }
            }
        }
        this.props.history.push(`/`);
    }

    renderBoxes = () =>
        this.props.sources.map((source, index) => (
            <Option
                key={index}
                source={source}
                dark={index%2!==0}
                onClick={() => this.props.history.push(`/beverage/${source.id}`)}
            />
        ));

    renderBeverage = (selectedId) => {
        const source = this.props.sources.filter(source => source.id === selectedId)[0];
        return !source ? null : (
            <Beverage source={source} />
        );
    }

    render() {
        const selectedId = parseInt(this.props.match.params.id);
        return !selectedId
            ? this.renderBoxes()
            : this.renderBeverage(selectedId);
    }
}

List.propTypes = {
    sources: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    sources: state.sources
});

export default connect(mapStateToProps)(List);
