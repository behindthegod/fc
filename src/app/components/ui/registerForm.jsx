import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import api from './../../api';
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelect from "../common/form/multiSelect";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex:'male',
        qualities: [],
        license: false,
    });
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState([]);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}));
    }
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
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
        },
        license: {
            isRequired: {
                message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

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
                    name='profession'
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
                         defaultValue={data.qualities}
                         name='qualities'
                         label='Выберите ваши качества'
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name='license'
                error={errors.license}
            >Подтвердить лицензионное соглашение</CheckBoxField>
            <button type='submit'
                    disabled={!isValid}
                    className='btn btn-primary w-100 mx-auto'>submit</button>
        </form>
    );
};

export default RegisterForm;