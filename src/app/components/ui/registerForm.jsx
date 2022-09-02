import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import api from './../../api';
import SelectField from "../common/form/selectField";

const RegisterForm = () => {

    const [data, setData] = useState({email: '', password: '', profession: ''});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
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
                           onChange={handleChange}
                />
                <TextField label='password'
                           type='password'
                           name='password'
                           error={errors.password}
                           value={data.password}
                           onChange={handleChange}
                />
                <SelectField
                    label='Выбери свою профессию'
                    options={professions}
                    onChange={handleChange}
                    value={data.profession}
                    defaultOption='Choose...'
                    error={errors.profession}
                />
            </div>
            <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>submit</button>
        </form>
    );
};

export default RegisterForm;