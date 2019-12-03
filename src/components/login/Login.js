import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginInput from "./LoginInput";
import { loginPage, window, heading, button } from "./Login.css";

class Login extends Component {
    static propTypes = {
        history: PropTypes.object
    };
    state = {
        values: {
            email: "",
            password: ""
        },
        errors: {
            email: false,
            password: false
        },
        masks: {
            email: /.+@.+\..+/,
            password: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/
        }
    }

    updateValue = (type, updatedValue) => {
        const values = { ...this.state.values };
        values[type] = updatedValue;
        this.setState({ values });
    }

    checkValue = (mask, value) => !mask.test(value);

    touchValue = (type) => {
        const errors = { ...this.state.errors };
        const value = this.state.values[type];
        const mask = this.state.masks[type];
        errors[type] = this.checkValue(mask, value);
        this.setState({ errors });
    }

    submitForm = (event) => {
        event.preventDefault();
        if (!Object.keys(this.state.values).some(type => this.checkValue(this.state.masks[type], this.state.values[type]))) {
            this.props.history.push("/app/");
        } else {
            Object.keys(this.state.values).forEach(type => { this.touchValue(type); });
        }
    }

    render() {
        return (
            <main className={loginPage }>
                <div className={ window }>
                    <h1 className={ heading }>Авторизация</h1>
                    <form onSubmit={this.submitForm}>
                        <LoginInput
                            updateValue={ this.updateValue }
                            touchValue={this.touchValue}
                            value={ this.state.values.email }
                            error={ this.state.errors.email }
                            type="email"
                            label="Электронная почта"
                        />
                        <LoginInput
                            updateValue={ this.updateValue }
                            touchValue={this.touchValue}
                            value={ this.state.values.password }
                            error={ this.state.errors.password }
                            type="password"
                            label="Пароль"
                        />
                        <button type="submit" className={ button }>Войти</button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;
