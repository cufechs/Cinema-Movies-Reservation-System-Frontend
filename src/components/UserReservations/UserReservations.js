import React, { useState } from 'react';
import { useGetUserReservationsQuery, useDeleteReservationMutation } from '../../services/user';
import './UserReservations.css';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const UserReservations = () => {
    const userId = useSelector(state => state.user.id);
    const {data, isLoading, isSuccess, isError, refetch } = useGetUserReservationsQuery(userId);
    const firstName = useSelector(state => state.user.firstName);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteReservation] = useDeleteReservationMutation();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant, msg) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(msg, { variant });
    };

    const columns = [
        { field: 'id', headerName: 'Row ID', width: 80 },
        { field: 'start_time', headerName: 'Start Time', width: 170 },
        { field: 'seat_no', headerName: 'Seat no', width: 90 },
        { field: 'movie_id', headerName: 'Movie Id', width: 90 },
        { field: 'capacity', headerName: 'Capacity', width: 120 },
        {
            field: "action",
            headerName: "Action",
            width: 180,
            renderCell: (params) => {
                //console.log("in renderCell: ", params)
                const cancelReservation = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
          
                  const api = params.api;
                  const thisRow = {};
          
                  api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                      (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    );
                    console.log(params.row);
                    // movie_reservation_id
                  //deleteUser(thisRow.id).then(res => refetch());
                  deleteReservation({userId: params.row.user_id, moviereservationId: params.row.movie_reservation_id})
                      .then(res => {
                        console.log("res: ",res);
                        if (res.error && res.error.data.status == false) {
                          handleClickVariant('error', res.error.data.msg);
                        } else {
                          handleClickVariant('success', 'Reservation cancelled');
                        }
                        refetch()
                      });
                }

                return (
                    <div>
                      <IconButton aria-label="delete" onClick={cancelReservation}>
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

    const rows = [
      {id: 0, s: 1},
      {id: 1, s: 2}
    ]

    console.log("data: ", data?.moviereservations);
    return (
      <>
        {/* <h3>Welcome {firstName}</h3> */}
        <h2 className='welcome'>Welcome: {firstName}</h2>
        <div className="data__grid__reservations">
            <DataGrid
                rows={data?.moviereservations}
                //rows={rows}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                disableSelectionOnClick
                onSelectionModelChange={(row) => handleRowSelection(row)}
            />
                
        </div>
      </>
    )
}



export default UserReservations;

