import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";

const RegisterForm = () => {
    
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
            isEmail: {message: 'E-mail введен не корректно'},
        },

        password: {
            isRequired: {message: 'Пароль обязателен для заполнения'},
            isCapitalSymbol: {message: 'Пароль должен содержать хотя бы одну заглавную букву'},
            isContainDigit: {message: 'Пароль должен содержать хотя бы одну цифру'},
            min: {
                message: 'Пароль должен быть длинее 8 символов',
                value: 8
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const isValid = Object.keys(errors).length === 0;
    //параметр для отображения кнопки отправки формы на 62 строке.

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
            <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>submit</button>
        </form>
    );
};

export default RegisterForm;