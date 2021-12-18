import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:3000" 
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginInfo) => ({
                url: '/users',
                method: 'POST',
                body: loginInfo,
                headers: {}
            })
        })
    })
})

export const { useLoginMutation } = userApi;