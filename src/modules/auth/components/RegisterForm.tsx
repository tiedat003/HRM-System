import { useState, useEffect, ChangeEvent } from "react";
import React from "react";
import RegisterPage from "../pages/RegisterPage";
import LoginForm from "./LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css"
import { FormattedMessage } from "react-intl";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InputComponent from "../../common/components/InputComponent";

const RegisterForm = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        name: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value
        })
        validateEmail(formValues.email)
    }
    function validateEmail(value: string) {
        throw new Error("Function not implemented.");
    }

    const handleSave = () => {
        localStorage.setItem('userEmail', formValues.email)
        localStorage.setItem('userPassword', formValues.password)
        localStorage.setItem('userName', formValues.name)
    };

    // Validate Email
    const [errorEmail, setErrorEmail] = useState('')
    useEffect(() => {
        if (formValues.email) {
            const validateEmail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!validateEmail.test(formValues.email)) {
                setErrorEmail('Nhập đúng định dạng email');
            } else {
                setErrorEmail('')
            }
        } else {
            setErrorEmail('');
        }
    }, [formValues.email]);

    // Validate Password
    const [errorPass, setErrorPass] = useState('')
    useEffect(() => {
        if (formValues.password) {
            if (formValues.password.length < 8) {
                setErrorPass('Vui lòng nhập đủ 8 kí tự');
            } else {
                setErrorPass('');
            }
        } else {
            setErrorPass('');
        }
    }, [formValues.password]);

    // Validate RePass
    const [errorRePass, setErrorRePass] = useState('')
    useEffect(() => {
        if (formValues.repeatPassword) {
            if (formValues.password !== formValues.repeatPassword) {
                setErrorRePass('Vui lòng nhập đúng mật khẩu');
            } else {
                setErrorRePass('')
            }
        } else {
            setErrorRePass('');
        }
    }, [formValues.repeatPassword]);

    // Validate Name
    const [errorName, setErrorName] = useState('')
    useEffect(() => {
        if (formValues.name) {
            const validateName = /^[a-zA-Z\s]+$/;
            if (!validateName.test(formValues.name)) {
                setErrorName('Nhập đúng định dạng họ và tên')
            } else {
                setErrorName('')
            }
        } else {
            setErrorName('')
        }
    })

    // Validate Form
    const [errors, setErrors] = useState({})
    const validateForm = () => {
        const newError: any = {};
        if (!formValues.email) newError.email = "Vui lòng nhập email"
        if (!formValues.password) newError.password = "Vui lòng nhập mật khẩu"
        if (!formValues.repeatPassword) newError.repeatPassword = "Vui lòng nhập lại mật khẩu"
        if (!formValues.name) newError.name = "Vui lòng nhập họ và tên"
        setErrors(newError)
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted', formValues);
        }
    }

    return (
        <form>
            {/* Email */}
            <InputComponent
                type='text'
                value={formValues.email}
                id='email'
                inputChange={handleInputChange}
                error={errorEmail} />

            {/* Password */}
            <InputComponent
                type='password'
                value={formValues.password}
                id='password'
                inputChange={handleInputChange}
                error={errorPass} />

            {/* Repeat Password */}
            <InputComponent
                type='password'
                value={formValues.repeatPassword}
                id='repeatPassword'
                inputChange={handleInputChange}
                error={errorRePass} />

            {/* Name */}
            <InputComponent
                type='text'
                value={formValues.name}
                id='name'
                inputChange={handleInputChange}
                error={errorName} />

            {/* Gender */}
            <div className="mb-3">
                <label htmlFor="gender" className="form-label" id="gender">
                    <FormattedMessage id="gender" />
                </label>
                <select className="form-select form-select-sm" aria-label="Large select example">
                    <option value=" " selected>--select an option--</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                    <option value="3">Khác</option>
                </select>
                {/* {errorGender && <p style={{ color: "red" }}>{errorGender}</p>} */}
            </div>

            {/* Region */}
            <div className="mb-3">
                <label htmlFor="region" className="form-label" id="region">
                    <FormattedMessage id="region" />
                </label>
                <select className="form-select form-select-sm" aria-label="Large select example">
                    <option value=" " selected>--select an option--</option>
                    <option value="1">1</option>
                    <option value="2">12</option>
                    <option value="3">123</option>
                </select>
                {/* {errorRegion && <p style={{ color: "red" }}>{errorRegion}</p>} */}
            </div>

            {/* State */}
            <div className="mb-3">
                <label htmlFor="state" className="form-label" id="state">
                    <FormattedMessage id="state" />
                </label>
                <select className="form-select form-select-sm" aria-label="Large select example">
                    <option value=" " selected>--select an option--</option>
                    <option value="1">3</option>
                    <option value="2">32</option>
                    <option value="3">321</option>
                </select>
                {/* {errorState && <p style={{ color: "red" }}>{errorState}</p>} */}
            </div>

            {/* Button */}
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSave}
                onSubmit={handleSubmit}
                disabled={!formValues.email || !formValues.password || !formValues.repeatPassword || !formValues.name}
            ><FormattedMessage id="register" />
            </button>

            <Link to='/login'>
                <button
                    type="submit"
                    className="btn btn-secondary"
                ><FormattedMessage id="login" />
                </button>
                <Route path="/login" component={LoginForm} />
            </Link>
        </form>
    );
}


export default RegisterForm

