import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const UserLink = ({id, name}) => {
    return (
        <>
            <Link key={id} to={`/users/${id}`}>
                {name}
            </Link>
        </>
    );
};
UserLink.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
}

export default UserLink;