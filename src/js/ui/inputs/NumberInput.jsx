'use strict';

const React = require('react');
const classNames = require('classnames');

const UIComponent = require('../UIComponent');
const { clamp, roundTo } = require('../../util/math.js');

class NumberInput extends UIComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== undefined) {
            this.setValue(nextProps.value, Object.assign({}, this.props, nextProps));
        }
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onKeyUp(e) {
        e.stopPropagation();
        e.preventDefault();

        // Enter key
        if (e.keyCode === 13) {
            this.checkValue();
        }
    }

    onBlur(e) {
        e.stopPropagation();
        e.preventDefault();

        this.checkValue();
    }

    setValue(val, props) {
        val = this.parseValue(val, props);

        this.setState({ value: val });

        return val;
    }

    parseValue(val, props) {
        let { min, max, step, decimals } = props;

        // Round value to nearest interval
        if (step !== false) {
            val = roundTo(val, step);
        }

        // Clamp to min/max
        if (min !== false && max !== false) {
            val = clamp(val, min, max);
        }

        return Number(val);
    }

    checkValue() {
        let val = this.state.value;

        if (this.props.value !== val) {
            let regex = /^(0|\-?([0-9]*\.[0-9]+|[1-9]+[0-9]*))$/;

            // If valid number
            if (regex.test(val)) {
                val = this.setValue(val, this.props);

                // Send new value to parent
                this.props.onChange(this.props.name, val);
            }
            // Reset to old value
            else {
                this.setValue(this.props.value, this.props);
            }
        }
    }

    render(){
        return (
            <div className="input">
                <input
                    type="text"
                    className={classNames('input-field', {'input-hidden': this.props.hidden})}
                    name={this.props.name}
                    size={this.props.size}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyUp={this.onKeyUp}
                    readOnly={this.props.readOnly}
                />
            </div>
        );
    }
}

NumberInput.defaultProps = {
    name: "number",
    size: 3,
    value: 0,
    min: false,
    max: false,
    step: false,
    readOnly: false,
    hidden: false,
    onChange: () => {}
};

module.exports = NumberInput;