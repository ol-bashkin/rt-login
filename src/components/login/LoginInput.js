import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Login.css";

class LoginInput extends Component {
    static propTypes = {
        updateValue: PropTypes.func.isRequired,
        touchValue: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        error: PropTypes.bool.isRequired,
        label: PropTypes.string
    }
    handleChange = event => {
        const updatedValue =  event.currentTarget.value;
        this.props.updateValue(this.props.type, updatedValue);
    }
    touchInput = () => {
        this.props.touchValue(this.props.type);
    }
    render() {
        let labelClass = this.props.value !== "" ? styles.labelActive : styles.label;
        let underlineClass = this.props.error ? styles.underlineError : styles.underline;
        return (
            <div className={styles.input_container}>
                <input
                    onChange={this.handleChange}
                    onBlur={this.touchInput}
                    id={this.props.type}
                    type={this.props.type}
                    className={styles.input}
                    value={this.props.value}
                />
                <label htmlFor={this.props.type} className={ labelClass }>
                    {this.props.label}
                </label>
                <span className={ underlineClass }></span>
            </div>
        );
    }
}

export default LoginInput;