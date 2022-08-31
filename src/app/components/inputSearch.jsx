import React from "react";
import PropTypes from "prop-types";

const InputSearch = ({ value, onChange }) => {
    return (
        <div className="container">
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

InputSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default InputSearch;
