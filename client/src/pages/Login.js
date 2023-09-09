import axios from "axios";
import React, { createRef } from "react";
import { useNavigate } from "react-router-dom";
// import { toast, TypeOptions } from 'react-toastify';

const Login = (props)=>{
    const emailRef = createRef();
    const passwordRef = createRef();
    const history = useNavigate ();

    // const notify = (text: string, type: TypeOptions) => toast(text, {
    //     position:'top-right',
    //     type,
    // });

    const loginUser=()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8000/api/login',{
            email, password
        }).then(res=>{
            if(res.data.data.success===false){
                alert(res.data.message)
            }else{
                alert(res.data.message)
                localStorage.setItem('token',res.data.data.token)
                history('/users')
            }
        }).catch(err=>{
            console.log(err,"err")
            alert(err.response.data.message)
            // notify(err.message,"success")
        })
    }
    return <div className="card">
        <div className="classHeader">Login</div>
        <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="abc@example.com" ref={emailRef} required />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="your password" ref={passwordRef} required />
            </div>
            <button onClick={loginUser}>Login</button>
        </div>
    </div>
}

export default Login