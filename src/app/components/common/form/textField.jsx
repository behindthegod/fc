import React, {useState} from 'react';
import PropTypes from "prop-types";

const TextField = ({label, type, name, value, onChange, error, placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    }
    const showTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    }
    return (
        <div className='mb-4'>
            <div>
                <label htmlFor={name}>{label}</label>
                <div className='input-group has-validation'>
                    <input type={showPassword ? 'true' : type}
                           id={name}
                           value={value}
                           onChange={onChange}
                           name={name}
                           className={getInputClasses()}
                           placeholder={placeholder}
                    />
                    {type === "password" &&
                    <button className="btn btn-outline-secondary" type="button"
                            onClick={showTogglePassword}>
                        <i className={
                            'bi bi-eye' + (showPassword ? '-slash' : '')}/>
                    </button>
                    }
                    {error && <div className='invalid-feedback'>{error}</div>}
                </div>
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
    error: PropTypes.string,
    placeholder: PropTypes.string
}

export default TextField;