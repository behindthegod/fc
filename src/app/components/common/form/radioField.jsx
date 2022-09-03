import React from 'react';
import PropTypes from "prop-types";


const RadioField = ({options, name, value, onChange, label}) => {
    return (
        <div className='mb-4'>
            <label className="form-label">{label}</label>
            {options.map((option) => (
                <div className="form-check form-check-inline" key={option.name + "_" + option.value}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={option.name + "_" + option.value}
                        name={name}
                        value={option.value}
                        checked={option.value===value}
                        onChange={onChange}
                    />
                    {option.name}
                    <label className="form-check-label" htmlFor={option.name + "_" + option.value}></label>
                </div>
            ))}
        </div>

    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
}
export default RadioField;