import React, {useEffect, useState} from 'react';
import api from '../../../api';
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelect from "../../common/form/multiSelect";

const UserReformat = ({userId}) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: '',
        qualities: [],
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState();

    useEffect(()=> {
        api.users.getById(userId).then((data)=>{
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession,
                sex: data.sex,
                qualities: data.qualities
            })
        })
        api.professions.fetchAll().then((data)=>setProfessions(data));
        api.qualities.fetchAll().then((data)=> setQualities(data));
    }, []);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email обязателен к заполнению"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Обязательно введите имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) =>({...prevState, [target.name]: target.value}));
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log('привет')
    };


    if (data.qualities && Object.keys(professions).length !== 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                defaultOption="Choose..."
                                name="profession"
                                value={data.profession.name}
                                label="Выбери свою профессию"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelect
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities.map(
                                    (q) => ({
                                        label: q.name,
                                        value: q._id
                                    })
                                )}
                                name="qualities"
                                label="Выберите ваши качества"
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading...";
    }
};

export default UserReformat;