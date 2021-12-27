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

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import axios from 'axios';



const UserReservation = (props) => {
    const [movies, setMovies] = useState([]);

    const columns = [
        {
          field: 'action',
          headerName: 'Action',
          sortable: false,
          renderCell: (params) => {
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
      
              return alert(JSON.stringify(thisRow, null, 4));
            };
      
            return <p>Hello</p>;//<Button onClick={onClick}>Click</Button>;
          },
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
      
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) => {
            //   let movie = null;
            //   const getMovie = async (params) => {
            //       let movieid = params.getValue(params.id, 'id');
            //       try {
            //           const response = await axios.get(`http://localhost:3000/movies?id=${movieid}`)
            //           //console.log("response: ", response);
            //           movie = response.data;
            //           console.log("movie async: ", movie);
                      
            //       } catch(error) {
            //           console.log("error: ", error)
            //       }
            //   }
              
            //   getMovie(params);
            //   console.log("movie data: ", movie);
            // return `${params.getValue(params.id, 'title') || ''} ${
            //   params.getValue(params.id, 'id') || ''
            // }`
            let _movies = movies.filter(movie => typeof(movie) != "undefined")
            let movie = _movies ? _movies.filter(movie => movie.id == params.getValue(params.id, 'id')) : null;
            return `${movie.length > 0 ? movie[0].title : ''}`
          },
        },
      ];
      
      const rows = [
        { id: 1, title: 'Snow', description: 'Jon', age: 35 },
        { id: 2, title: 'Lannister', description: 'Cersei', age: 42 },
        { id: 3, title: 'Lannister', description: 'Jaime', age: 45 },
        { id: 4, title: 'Stark', description: 'Arya', age: 16 },
        { id: 5, title: 'Targaryen', description: 'Daenerys', age: null },
        { id: 6, title: 'Melisandre', description: null, age: 150 },
        { id: 7, title: 'Clifford', description: 'Ferrara', age: 44 },
        { id: 8, title: 'Frances', description: 'Rossini', age: 36 },
        { id: 9, title: 'Roxie', description: 'Harvey', age: 65 },
      ];


      useEffect(() => {
        const movieIds = rows.map(e => e.id);
        const exec = async () => {
            const fetchedMovies = await Promise.all(rows.map(movie => {
              return axios.get(`http://localhost:3000/movies?id=${movie.id}`)
            }))
            console.log("fetchedMovies: ", fetchedMovies.map(movie => movie.data[0]));
            setMovies(fetchedMovies.map(movie => movie.data[0]));
          };
       
          exec();
          
      }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      { movies.length > 0 && <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />}
    </div>
  );
}

export default UserReservation;