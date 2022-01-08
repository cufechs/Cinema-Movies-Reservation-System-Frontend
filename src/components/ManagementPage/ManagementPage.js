import React, { useState } from 'react';
import './ManagementPage.css';
import { useGetAllMoviesManagerQuery } from '../../services/manager';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import SnackBar from '../SnackBar/SnackBar';
import EditMovieModal from '../EditMovieModal/EditMovieModal';
import ViewDetailsModal from '../ViewDetails/ViewDetailsModal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManagementPage = () => {
    const navigate = useNavigate();
    const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetAllMoviesManagerQuery();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentSelectedMovie, setCurrentSelectedMovie] = useState({id: '', title: '', poster_image: '', description: ''});
  
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 430 },
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
                handleOpen();
                //console.log("id: ", params.row);
                setCurrentSelectedMovie({
                  id: params.id,
                  title: params.getValue(params.id, 'title'),
                  poster_image: params.row.poster_image ,
                  description: params.row.description
                })
                handleEditMovieModalOpen();
                return null;//alert(JSON.stringify(thisRow, null, 4));
              };
        
              //return <Button onClick={onClick}>Click</Button>;
              return (
                <IconButton aria-label="edit" onClick={onClick}>
                    <EditIcon />
                </IconButton>
              )
            },
          },

          {
            field: 'details',
            headerName: 'View detials',
            sortable: false,
            width: 110,
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
                //handleOpen();
                //handleViewDetailsModalOpen();
                navigate(`/movie-reservations/${params.id}`, {
                  state: {
                    movieID: params.id,
                    movieTitle: params.row.title,
                    moviePoster: params.row.poster_image,
                    movieDescription: params.row.description
                  }
                });
                return null;//alert(JSON.stringify(thisRow, null, 4));
              };
        
              //return <Button onClick={onClick}>Click</Button>;
              return (
                <IconButton aria-label="more" onClick={onClick}>
                    <MoreHorizIcon />
                </IconButton>
              )
            },
          }
        
      ];

    const handleRowSelection = (row) => {
        //setSelectedUser(Array.from(data).filter(user => user.id === parseInt(row[0]))[0]);
        console.log(row);
        

    }

    // add movie states
    const [movieModalOpen, setMovieModalOpen] = useState(false);
    const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
    const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
    // edit movie states
    const [editMovieModalOpen, setEditMovieModalOpen] = useState(false);
    const [successEditSnackBarOpen, setSuccessEditSnackBarOpen] = useState(false);
    const [errorEditSnackBarOpen, setErrorEditSnackBarOpen] = useState(false);
    // view details states
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    //const [successEditSnackBarOpen, setSuccessEditSnackBarOpen] = useState(false);
    //const [errorEditSnackBarOpen, setErrorEditSnackBarOpen] = useState(false);

    // add movie handlers
    const handleMovieModalOpen=() => setMovieModalOpen(true);
    const handleMovieModalClose=() => setMovieModalOpen(false);
    const handleCreateMovieSuccess=() => setSuccessSnackBarOpen(true);
    const handleCloseSuccessSnackbar=() => setSuccessSnackBarOpen(false);
    const handleCreateMovieError=() => setErrorSnackBarOpen(true);
    const handleCloseMovieError=() => setErrorSnackBarOpen(false);
    
    // edit movie handlers
    const handleEditMovieModalOpen=() => setEditMovieModalOpen(true);
    const handleEditMovieModalClose=() => setEditMovieModalOpen(false);
    const handleEditMovieSuccess=() => setSuccessEditSnackBarOpen(true);
    const handleCloseEditSnackbar=() => setSuccessEditSnackBarOpen(false);
    const handleEditMovieError=() => setErrorEditSnackBarOpen(true);
    const handleCloseEditMovieError=() => setErrorEditSnackBarOpen(false);

    // view details handlers
    const handleViewDetailsModalOpen=() => setViewDetailsModalOpen(true);
    const handleViewDetailsModalClose=() => setViewDetailsModalOpen(false);

    return (
        <>
        <div className="add__movie">
            <Button variant="contained" endIcon={<AddIcon />} onClick={handleMovieModalOpen}>
                Add Movie
            </Button>
        </div>
        <div className="data__grid__manager">
            <DataGrid
                rows={data?.movies}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                disableSelectionOnClick
                onSelectionModelChange={(row) => handleRowSelection(row)}
                onRowClick={(row) => handleRowSelection(row)}
            />
                
        </div>
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: 'black'}}>
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            </Box>
        </Modal> */}
        
        <AddMovieModal 
          open={movieModalOpen}
          handleClose={handleMovieModalClose}
          refetchMovies={refetch} 
          handleCreateMovieSuccess={handleCreateMovieSuccess}
          handleCreateMovieError={handleCreateMovieError}
          //successSnackBarOpen={successSnackBarOpen}
        />

        <EditMovieModal 
          open={editMovieModalOpen}
          handleClose={handleEditMovieModalClose}
          refetchMovies={refetch} 
          handleEditMovieSuccess={handleEditMovieSuccess}
          handleEditMovieError={handleEditMovieError}
          currentSelectedMovie={currentSelectedMovie}
          //successSnackBarOpen={successSnackBarOpen}
        />

        <ViewDetailsModal 
          open={viewDetailsModalOpen}
          handleClose={handleViewDetailsModalClose}
          refetchMovies={refetch} 
          handleEditMovieSuccess={handleEditMovieSuccess}
          handleEditMovieError={handleEditMovieError}
          currentSelectedMovie={currentSelectedMovie}
          //successSnackBarOpen={successSnackBarOpen}
        />

        {/* Add move snackbars */}
        <SnackBar 
          severity="success"
          message="Movie created successfully!"
          setOpen={handleCloseSuccessSnackbar}
          open={successSnackBarOpen} 
        />

        <SnackBar 
          severity="error"
          message="Error creating movie!"
          setOpen={handleCloseMovieError}
          open={errorSnackBarOpen} 
        />

        {/* Edit Movie snackbars */}
        <SnackBar 
          severity="success"
          message="Movie edited successfully!"
          setOpen={handleCloseEditSnackbar}
          open={successEditSnackBarOpen} 
        />

        <SnackBar 
          severity="error"
          message="Error creating movie!"
          setOpen={handleCloseEditMovieError}
          open={errorEditSnackBarOpen} 
        />

        </>
    )
}

export default ManagementPage;
