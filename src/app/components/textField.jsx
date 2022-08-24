import React from 'react';
import PropTypes from "prop-types";

const TextField = ({label, type, name, value, onChange, error}) => {
    return (
        <div>
            <div>
                <label htmlFor={name}>{label}</label>
                <input type={type}
                       id={name}
                       value={value}
                       onChange={onChange}
                       name={name}/>
                {error && <p>{console.log(error)}</p>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: 'text'
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default TextField;