import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'reactstrap';

const FormWrapper = styled.div`
    background-color: rgb(245, 245, 245);
    margin-top: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;

    select {
        width: auto;
        display: inline-block;
        margin: 0 10px;
    }
`;

const ResponseWrapper = styled.div`
    border: 1px solid rgb(245, 245, 245);
    border-top: 0;
    padding: 20px;

    p {
        margin-bottom: 0;
    }
`;

const SAFE_CAFFEINE_LEVEL = 500;
const DEFAULT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class BeverageForm extends React.PureComponent {
    state = {
        quantity: 1
    };

    setQuantity = (input) => this.setState({
        quantity: parseInt(input.target.value)
    });

    dropdown = () => (
        <Input type="select" onChange={this.setQuantity}>
            {DEFAULT_OPTIONS.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </Input>
    );

    form = (totalCaffeine) => (
        <FormWrapper>
            {`I'd like to consume`}
            {this.dropdown()}
            {`${this.props.source.type}${this.state.quantity > 1 ? `s`:``},
            resulting in a total intake of `}
            <strong>{`${totalCaffeine}mg of caffeine.`}</strong>
        </FormWrapper>
    );

    response = (totalCaffeine) => {
        const remaining = SAFE_CAFFEINE_LEVEL - totalCaffeine;
        const servingsPerBeverage = this.props.source.servings;
        const servingSize = this.props.source.caffeine_per_serving;
        const beverageType = this.props.source.type;
        if (remaining < 0) {
            const maxBeverages = Math.floor(SAFE_CAFFEINE_LEVEL / (servingSize * servingsPerBeverage));
            return (
                <ResponseWrapper>
                    <p>{`Oops! The most you can safely consume of this beverage
                    ${maxBeverages > 1 ? `are`:`is`} ${maxBeverages}
                    ${beverageType}${maxBeverages > 1 ? `s`:``}.`}</p>
                </ResponseWrapper>
            );
        } else {
            const remainingServings = Math.floor(remaining / servingSize);
            if (remainingServings === 0) {
                return (
                    <ResponseWrapper>
                        <p>{`You've hit the goldilocks zone! This is a safe amount
                        of caffeine to consume.`}</p>
                    </ResponseWrapper>
                );
            } else {
                const remainingBeverages = Math.floor((SAFE_CAFFEINE_LEVEL - totalCaffeine) / (servingSize * servingsPerBeverage));
                if (remainingBeverages === 0) {
                    const percentOfUnit = Math.floor((remainingServings / servingsPerBeverage) * 100);
                    return (
                        <ResponseWrapper>
                            <p>{`Sweet! You can safely consume ${remainingServings}
                            additional serving${remainingServings > 1 ? `s`:``}, or
                            roughly ${percentOfUnit}% of a ${beverageType}.`}</p>
                        </ResponseWrapper>
                    );
                } else {
                    return (
                        <ResponseWrapper>
                            <p>{`Nice! You can safely consume ${remainingBeverages} more
                            ${beverageType}${remainingBeverages > 1 ? `s`:``}.`}</p>
                        </ResponseWrapper>
                    );
                }
            }
        }
        return null;
    }

    render() {
        const totalCaffeine = this.state.quantity * (this.props.source.caffeine_per_serving * this.props.source.servings);
        return (
            <>
                {this.form(totalCaffeine)}
                {this.response(totalCaffeine)}
            </>
        );
    }
}

BeverageForm.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        servings: PropTypes.number,
        caffeine_per_serving: PropTypes.number,
    }).isRequired,
};

export default BeverageForm;
