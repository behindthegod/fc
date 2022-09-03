import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import api from './../../api';
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelect from "../common/form/multiSelect";

const RegisterForm = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex:'male',
        qualities: [],
    });
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}));
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
                    name='qualities'
                />
            </div>
            <RadioField options={[
                {name:'Male',value:'male'},
                {name:'Female',value:'female'},
                {name:'Other',value:'other'}
                ]}
                        value={data.sex}
                        name='sex'
                        onChange={handleChange}
                        label='Выберите ваш пол'
            />
            <MultiSelect options={qualities}
                         onChange={handleChange}
                         name='qualities'
                         label='Выберите ваши качества'
            />
            <button type='submit'
                    disabled={!isValid}
                    className='btn btn-primary w-100 mx-auto'>submit</button>
        </form>
    );
};

export default RegisterForm;