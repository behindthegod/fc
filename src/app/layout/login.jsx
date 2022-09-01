import React, {useState} from 'react';
import LoginForm from "../components/ui/loginForm";
import {useParams} from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const {type} = useParams();
    const [formType, setFormType] = useState(type === 'register'? type: 'login');

    const toggleFormType = () => {
        setFormType((prevState) => prevState === 'register'?'login':'register');
    }

    return (
        <div className="container mt-2 shadow p-4">
            <div className="row">
                <div className='col-md-6 .offset-md-3'>
                    {formType === 'register'
                        ? <>
                            <h3 className='mb-4'>Register Form</h3>
                            <RegisterForm/>
                            <p>Уже есть аккаунт? <a role='button' onClick={toggleFormType}>Залогиниться</a></p>
                        </>
                        : <>
                            <h3 className='mb-4'>Login Form</h3>
                            <LoginForm/>
                            <p>У вас нет аккаунта? <a role='button' onClick={toggleFormType}>Завести</a></p>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Login;
