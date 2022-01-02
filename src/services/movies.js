import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://127.0.0.1:8000/api" 
    }),
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => '/movies/all'
        }),
        getMovie: builder.query({
            query: (id) => { 
                console.log("id: ", id.id)
               return `/movie/show/${id}`
            }
        }),
        getMovieReservation: builder.query({
            query: (id) => {
                return `/movieReservation/?movieId=${id.id}`
            }
        }),
        getMovieReservations: builder.query({
            query: (id) => `/moviereservations/getReservations/${id}`
        })
    })
})

export const { 
    useGetAllMoviesQuery,
    useGetMovieQuery,
    useGetMovieReservationQuery,
    useGetMovieReservationsQuery
    
} = moviesApi;