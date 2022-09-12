import React, {useEffect, useState} from 'react';
import api from '../../../api';
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelect from "../../common/form/multiSelect";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";


const UserReformat = ({userId}) => {

    const [user, setUser] = useState();
    const [edit, setEdit] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });

        api.users.getById(userId).then((data) =>
            setEdit({
                userName: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((q) => ({
                    value: q._id,
                    label: q.name,
                    color: q.color
                }))
            })
        );
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const profList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(profList);
        });

        api.qualities.fetchAll().then((data) => {
            const qualList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualList);
        });
    }, []);

    const getProfessionById = (id) => {
        for (const p of professions) {
            if (p.value === id) {
                return {_id: p.value, name: p.label};
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const el of elements) {
            for (const quality in qualities) {
                if (el.value === qualities[quality].value) {
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

    const handleChange = (target) => {
        setEdit((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleUpdateDataUser = () => {
        const {profession, qualities} = edit;
        setUser((prevState) => ({
            ...prevState,
            name: edit.userName,
            email: edit.email,
            sex: edit.sex,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities),
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email обязателен для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [edit]);

    const validate = () => {
        const errors = validator(edit, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users.update(userId, user);
        history.push(`/users/${userId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {edit ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="userName"
                                value={edit.userName}
                                onChange={handleChange}
                                error={errors.userName}/>

                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={edit.email}
                                onChange={handleChange}
                                error={errors.email}/>

                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={edit.profession}
                                error={errors.profession}/>

                            <RadioField
                                options={[
                                    {name: "Male", value: "male"},
                                    {name: "Female", value: "female"},
                                    {name: "Other", value: "other"}
                                ]}
                                value={edit.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"/>

                            <MultiSelect
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={edit.qualities}
                                name="qualities"
                                label="Выберите ваши качества"/>
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                onClick={handleUpdateDataUser}
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );

};
UserReformat.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserReformat;