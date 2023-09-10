import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { FaRegTrashAlt,FaEdit } from "react-icons/fa";
import { useDeleteUserMutation} from "../slices/adminSlices/adminApiSlice";
import { toast } from "react-toastify";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const TableComponent = () => {
 
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [deleted, setDeleted] = useState(false)
  
  const [deleteUser] = useDeleteUserMutation();

    
const navigate=useNavigate()
    const handleSearch = (e)=>{
      setSearch(e.target.value)
    }

   

    const handleEdit = async (userId) => {
    
    
      try {
     
        navigate(`/admin/editUser`, { state: { userId } });
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
      // const editHandler= ()
    const deleteHandler = async (id)=>{
      const { value } = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });
    
      // Check if the user confirmed the deletion
      if (value) {
        try {
          const deleteSuccess = await deleteUser({ id });
          toast.success('Deleted Successfully');
          setDeleted(!deleted);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      }
    }

    useEffect(() => {
      const fetchUsers = async ()=>{
        const userDetails = await axios.get('http://localhost:3000/api/admin/adminHome')
        console.log(userDetails.data.userData)
        setUsers(userDetails.data.userData);
      }
      fetchUsers();
    },[deleted])

    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form>
        <Form.Group className="d-flex my-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            style={{ width: "500px" }}
            value={search}
            type="text"
            placeholder="Search Here"
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Option</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.length !== 0 ?(
          filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ cursor: 'pointer' }}><FaEdit onClick={() => handleEdit(user._id)} /></td>
              <td style={{cursor:'pointer'}} onClick={()=>{deleteHandler(user._id)}}><FaRegTrashAlt/></td>
            </tr>
          ))):(
            <tr>
                <td colSpan={4} className="text-center">No users Available</td>
            </tr>
          )
          }
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;