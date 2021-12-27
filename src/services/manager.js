import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const managerApi = createApi({
    reducerPath: "managerApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:3000" 
    }),
    endpoints: (builder) => ({
        getAllMoviesManager: builder.query({
            query: () => `/movies`
        })
    })
})

export const { 
    useGetAllMoviesManagerQuery
} = managerApi;