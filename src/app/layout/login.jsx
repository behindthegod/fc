import React, {useEffect, useState} from 'react';
import TextField from "../components/textField";
import {validator} from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
    }
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const validatorConfig = {
        email: {
            isRequired: {message: 'Электронная почта обязательна для заполнения'},
            isEmail: {message: 'E-mail введен не корректно'}
        },

        password: {isRequired: {message: 'Пароль обязателен для заполнения'}}
    }

    useEffect(() => {
        validate()
    }, [data])
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField label='e-mail'
                           name='email'
                           error={errors.email}
                           value={data.email}
                           onChange={handleChange}/>
                <TextField label='password'
                           type='password'
                           name='password'
                           error={errors.password}
                           value={data.password}
                           onChange={handleChange}/>
            </div>
            <button type='submit'>submit</button>
        </form>
    );
};

export default Login;