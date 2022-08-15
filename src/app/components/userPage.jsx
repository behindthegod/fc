import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitieList";

const UserPage = ({userId}) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const showAllUsers = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div>
                <h3>{user.name}</h3>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <h4>{`completedMeetings: ${user.completedMeetings}`}</h4>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button
                    onClick={() => {
                        showAllUsers();
                    }}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return <h2>Loading...</h2>;
};

export default UserPage;