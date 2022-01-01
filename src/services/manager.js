import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const managerApi = createApi({
    reducerPath: "managerApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://127.0.0.1:8000/api" 
    }),
    endpoints: (builder) => ({
        getAllMoviesManager: builder.query({
            query: () => `/movies/all`
        }),
        createMovie: builder.mutation({
            query: (movie) => ({
                url: `/movie/create`,
                method: 'POST',
                body: movie
            })
        }),
        editMovie: builder.mutation({
            query: ({id, ...movie}) => ({
                url: `/movie/update/${id}`,
                method: 'PUT',
                body: movie
            })
        })
    })
})

export const { 
    useGetAllMoviesManagerQuery,
    useCreateMovieMutation,
    useEditMovieMutation
} = managerApi;