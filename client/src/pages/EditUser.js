import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const EditUser = (props)=>{
    const [isShow,setIsShow]= useState(false);

    const initModal = ()=>{
        return setIsShow(!isShow);
    }

    const [name,setName] = useState(props.name);
    const [email,setEmail] = useState(props.email);

    const updateUser = async ()=>{
        let data={
            name: name,
            email: email,
        }
      
      let config = {
        method: 'put',
        url: `http://localhost:8000/api/update/user/${props.userId}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        if(response.data.success===true){
            alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.data.message);
        console.log(error);
      });
    }

    return <>
    <Button variant="success" onClick={initModal}>
        Edit
    </Button>
    <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
            <Modal.Title >Update user details</Modal.Title>
        </Modal.Header>
        <form onSubmit={updateUser}>
        <Modal.Body>
            <label>name</label>
            <input type="text" name='name' placeholder='' value={name} onChange={(e)=> setName(e.target.value)} required />
            <br/><br/>
            <label>email</label>
            <input type="text" name='email' placeholder='' value={email} onChange={(e)=> setEmail(e.target.value)} required />
            <br/><br/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
                Close
            </Button>
            <Button type='submit'  onClick={initModal}>
                Update
            </Button>
        </Modal.Footer>
        </form>
    </Modal>

    </>
}

export default EditUser