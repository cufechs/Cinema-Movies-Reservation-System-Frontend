// import React, { useState, useEffect } from 'react';
// import './UserReservations.css';
// import { useGetUserQuery } from '../../services/user';
// import { useGetMovieQuery } from '../../services/movies';
// import { useSelector } from 'react-redux';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
// import DoneIcon from '@mui/icons-material/Done';
// import axios from 'axios';

// const UserReservations = () => {
//     const userId = useSelector(state => state.user.id);
//     const { data, error, isLoading, isFetching, isSuccess } = useGetUserQuery(userId);
//     //const { data: movieData, isSuccess: movieIsSuccess, refetch } = useGetMovieQuery({}, {skip: true});
//     const [movies, setMovies] = useState([]);
//     console.log("movies: ", movies);

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'title', headerName: 'Title', width: 130 },
//         { field: 'description', headerName: 'Description', width: 130 },
//         { field: 'src', headerName: 'Source', width: 130 }
        
//       ];

//       let rows = [
//           { id: 1, title: 'Movie1', description: 'description', src: 'source'}
//       ]

//       useEffect(() => {
//         const exec = async () => {
//             const fetchedMovies = await Promise.all(data?.reservations.map(movie => {
//               return axios.get(`http://localhost:3000/movies?id=${movie.movieId}`)
//             }))
       
//             setMovies(fetchedMovies.map(elem => elem.data[0]));
//           };
       
//           exec();
//       }, [data]);


//     return (
//         <div className="user__reservations">
//             <h2>My Reservations</h2>
//             {isSuccess && (
//                 data.reservations.map((reservation, index) => (
//                     <p>Reservations</p>
//                 ))
//             )}
//             <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
//         </div>
//     )
// }

// export default UserReservations;

// import React, { useState, useEffect } from 'react';
// import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
// //import axios from 'axios';
// import './UserReservations.css';
// import { useGetUserReservationsQuery } from '../../services/user';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
// import { useSelector } from 'react-redux';

// const UserReservation = (props) => {
//     const [movies, setMovies] = useState([]);
//     const userId = useSelector(state => state.user.id);
//     const {data, isLoading, isSuccess, isError, refetch } = useGetUserReservationsQuery(userId);
//     console.log(data)
//     const columns = [
//         //{ field: 'id', headerName: 'ID', width: 70 },
//         { field: 'start_time', headerName: 'Start Time', width: 190 },
//         { field: 'capacity', headerName: 'Cinema Capacity', width: 140 },
//         { field: 'price', headerName: 'Price (LE)', width: 100 },
//         { field: 'movie_id', headerName: 'Movie Id', width: 130 },
//         { field: 'seat_no', headerName: 'Seat no.', width: 90 },
//         {
//           field: 'action',
//           headerName: 'Cancel Reservation',
//           width: 160,
//           sortable: false,
//           renderCell: (params) => {
//             //console.log("in renderCell: ", params)
//             const deleteReservation = (e) => {
//                 e.stopPropagation(); // don't select this row after clicking
      
//               const api = params.api;
//               const thisRow = {};
      
//               api
//                 .getAllColumns()
//                 .filter((c) => c.field !== '__check__' && !!c)
//                 .forEach(
//                   (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
//                 );
//               //deleteUser(thisRow.id).then(res => refetch());
              
//             }

//             return (
                
//               <IconButton aria-label="delete" onClick={deleteReservation}>
//                   <ClearIcon />
//               </IconButton>
                
//             );
//           },
//         },
//       ];
    
//       useEffect(() => {
//         // const movieIds = rows.map(e => e.id);
//         // const exec = async () => {
//         //     const fetchedMovies = await Promise.all(rows.map(movie => {
//         //       return axios.get(`http://localhost:3000/movies?id=${movie.id}`)
//         //     }))
//         //     console.log("fetchedMovies: ", fetchedMovies.map(movie => movie.data[0]));
//         //     setMovies(fetchedMovies.map(movie => movie.data[0]));
//         //   };
       
//         //   exec();
          
//       }, []);

//       console.log("data: ", data?.moviereservations)
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <div className='data__grid__reservations'>
//        {/* <DataGrid 
//         rows={rows}
//         columns={columns}
//         pageSize={7}
//         rowsPerPageOptions={[5]}
//         checkboxSelection /> */}
//         <DataGrid
//             rows={data?.moviereservations}
//             columns={columns}
//             pageSize={7}
//             rowsPerPageOptions={[5]}
//             checkboxSelection={false}
//             disableSelectionOnClick
//             //onSelectionModelChange={(row) => handleRowSelection(row)}
//             //onRowClick={(row) => handleRowSelection(row)}
//         />
//       </div>
      
//     </div>
//   );
// }

// export default UserReservation;

import React, { useState } from 'react';
import { useGetUserReservationsQuery } from '../../services/user';
import './UserReservations.css';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';

const UserReservations = () => {
    const userId = useSelector(state => state.user.id);
    const {data, isLoading, isSuccess, isError, refetch } = useGetUserReservationsQuery(userId);
    const [selectedUser, setSelectedUser] = useState(null);
    // const [deleteUser] = useDeleteUserMutation();
    // const [approveUser] = useApproveUserMutation();

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
        <div className="data__grid">
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
    )
}



export default UserReservations;

