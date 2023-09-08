import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import EditUser from './EditUser';

export default function UserTable() {

  const [row,setRow] = useState([])
  const navigate = useNavigate()

  const getUsers = () =>{
    axios.get('http://localhost:8000/api/users',{
        headers: {
            Authorization:"Bearer "+localStorage.getItem('token'),
        },
    }).then((res)=>{
        setRow(res.data);
    }).catch(err=>{
        console.log(err);
    })
  }


const deleteUser = async (userId) =>{
  
  await axios.delete(`http://localhost:8000/api/delete/user/${userId}`,{
        headers: {
            Authorization:"Bearer "+localStorage.getItem('token'),
        },
    }).then((res)=>{
        if(res.success===true){
          document.getElementById(userId).parentElement.parentElement.remove()
          alert(res.data.message)
        }else{
          alert(res.data.message)
        }
    }).catch(err=>{
        console.log(err);
    })

}

useEffect(()=>{
  getUsers();
},[]);

  return (
    <div>
    {row.length>0 ?  (<table style={{width:'100%'}} border='1'>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">email</th>
        <th scope="col">Delete</th>
        <th scope="col">Update</th>
      </tr>
    </thead>
    <tbody >
      {row.map(user =>  (
        <tr>
        <th>{user._id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td >
          <Button variant="danger" id={user._id} onClick={(e)=>{deleteUser(user._id)}}>delete</Button>
          </td>
        <td><EditUser userId={user._id} name={user.name} email={user.email} /></td>
      </tr>
      ))}
    </tbody>
  </table>):<>
  <table style={{width:'100%'}} border='1'>
    <thead >
      <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">email</th>
        <th scope="col">actions</th>
      </tr>
    </thead>
    </table>
    <h3>please add users</h3>
    </>
   }
   </div>
   );
}