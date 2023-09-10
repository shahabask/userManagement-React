
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAdminUpdateUserMutation } from '../../slices/adminSlices/adminApiSlice';

function AdminEditUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const { userId } = location.state
   
    const navigate=useNavigate()
    const [updateUser]=useAdminUpdateUserMutation()
    useEffect(() => {
      const fetchUsers = async ()=>{
        const userDetails = await axios.get(`http://localhost:3000/api/admin/edit-user/${userId}`)
        
        setName(userDetails.data.name);
        setEmail(userDetails.data.email);
      }
      fetchUsers();
    },[])

    const handleSave =async (userId,name,email) => {
     try{

      const response=await updateUser({userId,name,email})
       console.log(response)
      navigate('/admin/adminHome')
     }catch(error){
      toast.error(error?.data?.message || error.error);
     }
    };
 const onCancel =()=>{
  navigate('/admin/adminHome')
 }

    return (
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Button variant="primary" onClick={()=>handleSave(userId,name,email)}>
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    );
}

export default AdminEditUser