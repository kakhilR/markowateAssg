import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register= (props)=>{
    let nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const history = useNavigate ();
    const saveUser=()=>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8000/api/register',{
            name, email, password
        }).then(res=>{
            if(res.data.success===true){
                alert(res.data.message)
                // history('/login')
            }else{
                alert(res.data.message)
            }
        }).catch(err=>{
            alert(err.response.data.message)
            console.log(err)
        })
    }
    return <div className="card">
    <div className="classHeader">Register</div>
    <div className="cardBody">
    <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter your name" ref={nameRef}/>
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="abc@example.com" ref={emailRef}/>
        </div>
        <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="your password" ref={passwordRef}/>
        </div>
        <button onClick ={saveUser}>Register</button>
    </div>
</div>
}

export default Register