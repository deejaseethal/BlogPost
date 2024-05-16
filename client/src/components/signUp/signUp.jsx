import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {

    const [data,setData]=useState({
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:''
    })


    const navigate = useNavigate();


    const handleChange=(e)=>{
       // console.log(e);
//console.log(e.target.value);
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    const onSubmit = (e) =>{
         e.preventDefault();
         console.log('hi');
         axios.post('http://localhost:3000/user/createUser',data)
         .then((res)=>{
            if(res.status === 200){
              alert("Registartion Successful")
              setTimeout(()=>{navigate("/login")},1000)
            }     
         })
         .catch((err)=>{
            console.log(err)
         })
    }

  return (
    <Form onSubmit={onSubmit} className='w-50 mx-auto mt-5'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" placeholder="First Name" name='firstName' onChange={handleChange}  />
      <br />
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Last Name" name='lastName' onChange={handleChange} />
      <br />
      <Form.Label>User Name</Form.Label>
      <Form.Control type="text" placeholder="User Name" name='userName' onChange={handleChange}/>
      <br />
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name='email' onChange={handleChange} />
        <br/>
        <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>
      <div className='d-flex justify-content-center'>
    <Button  type="submit" variant="outline-primary">SignUp</Button>
    </div>
    </Form>
  );
}

export default UserSignUp;