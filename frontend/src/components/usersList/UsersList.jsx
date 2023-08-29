import React from 'react';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import userService from '../../services/userService';

export default function UsersList() {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true);
      try{
        const res = await userService.getUsers();
        setUsers(res.data)
      }catch(err){
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  },[]);

  return (
    <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Password</th>
          <th scope='col'>About</th>
        </tr>
      </MDBTableHead>
      {!loading && (
        <MDBTableBody>
          {users.map((user)=>(
            <tr key={user.id}>
              <th scope='row'>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.about}</td>
            </tr>
          ))}
        </MDBTableBody>
      )}
    </MDBTable>
  );
}