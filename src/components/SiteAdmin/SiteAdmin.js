import React, { useState } from 'react';
import { useGetAllUsersQuery, useDeleteUserMutation, useApproveUserMutation } from '../../services/user';
import './SiteAdmin.css';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

// TODO: 
// 1. replace refetch with tagpairs 
// 2. pending is only on managers
const SiteAdmin = () => {
    const {data, isLoading, isSuccess, isError, refetch } = useGetAllUsersQuery();
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteUser] = useDeleteUserMutation();
    const [approveUser] = useApproveUserMutation();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'First name', width: 130 },
        { field: 'last_name', headerName: 'Last name', width: 130 },
        {
          field: 'username',
          headerName: 'User name',
          width: 130,
        },
        {
            field: 'role',
            headerName: 'Type',
            width: 95,
        },
        {
            field: 'management_request',
            headerName: 'Status',
            width: 95
        },
        {
            field: "action",
            headerName: "Action",
            width: 180,
            renderCell: (params) => {
                //console.log("in renderCell: ", params)
                const onClick = (e) => {
                  e.stopPropagation(); // don't select this row after clicking
          
                  const api = params.api;
                  const thisRow = {};

                  api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                      (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    );
                  //return alert(JSON.stringify(thisRow, null, 4));
                  console.log("thisRow before: ", thisRow);
                  let newRow = {
                      ...thisRow, 
                      management_request: 0
                  }
                  console.log("thisRow after: ", thisRow);
                  //approveUser({id: newRow.id, ...newRow});
                  approveUser(newRow.id).then(res => refetch())
                  
                };
          
                const declineUser = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
          
                  const api = params.api;
                  const thisRow = {};
          
                  api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                      (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    );
                  deleteUser(thisRow.id).then(res => refetch());
                  
                }

                return (
                    <div>
                        {/*console.log("params: ", params.getValue(params.id, 'status'))*/}
                        {/*params.getValue(params.id, 'status') === "pending" && <Button onClick={onClick}>Approve</Button>*/}
                        {(params.getValue(params.id, 'management_request') === 1 && params.getValue(params.id, 'role') === "customer") && (
                            <IconButton aria-label="delete" onClick={onClick}>
                                <DoneIcon />
                            </IconButton>
                        ) }
                        {/* <Button onClick={declineUser}>Remove</Button> */}
                        <IconButton aria-label="delete" onClick={declineUser}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                );
              },
        }
        
      ];

    const handleRowSelection = (row) => {
        setSelectedUser(Array.from(data?.users).filter(user => user.id === parseInt(row[0]))[0]);
    }

    console.log("data: ", data);
    return (
        <div className="data__grid">
            <p>{selectedUser && selectedUser.firstName}</p>
            <DataGrid
                rows={data?.users}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                disableSelectionOnClick
                onSelectionModelChange={(row) => handleRowSelection(row)}
            />
                
        </div>
    )
}



export default SiteAdmin;

