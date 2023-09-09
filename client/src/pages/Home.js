import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=>{


    return (
        <div  className="card">
        <div className="cardBody">
        <Link to={'/login'}><div className="classHeader">Login</div></Link>
        </div>
        <div className="cardBody">
        <Link to={'/register'}><div className="classHeader">Register</div></Link>
        </div>
        </div>
    )
}

export default Home;