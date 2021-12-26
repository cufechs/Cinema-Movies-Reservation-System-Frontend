import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:3000" 
    }),
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => '/movies'
        }),
        getMovie: builder.query({
            query: (id) => { 
                console.log("id: ", id.id)
               return `/movies/${id.id}`
            }
        }),
        getMovieReservation: builder.query({
            query: (id) => {
                return `/movieReservation/?movieId=${id.id}`
            }
        })
    })
})

export const { useGetAllMoviesQuery, useGetMovieQuery, useGetMovieReservationQuery } = moviesApi;