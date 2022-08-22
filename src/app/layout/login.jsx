import React, {useState} from 'react';
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({email:'', password:''});
    const handleChange = (e) => {
        setData((prevState)=>({...prevState,[e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField label='e-mail' name='email' value={data.email} onChange={handleChange}/>
                <TextField label='password' type='password' name='password' value={data.password} onChange={handleChange}/>
            </div>
            <button type='submit'>submit</button>
        </form>
    );
};

export default Login;