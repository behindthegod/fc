import React from 'react';
import {useParams} from "react-router-dom";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserReformat from "../components/page/userPage/userReformat";
import UserPage from "../components/page/userPage";

const Users = () => {
    const params = useParams();
    const {userId, reformat} = params;
    if (reformat && userId) {
        return <UserReformat userId={userId}/>;
    } else {
        return <>
            {userId ? <UserPage userId={userId}/> : <UsersListPage/>}
        </>;
    }
};

export default Users;