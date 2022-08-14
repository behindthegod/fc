import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitieList";

const UserPage = ({id}) => {
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
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <h6>{`completedMeetings: ${user.completedMeetings}`}</h6>
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