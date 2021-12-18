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
        }),
        getAllUsers: builder.query({
            query: () => `/users`
        }),
        getUser: builder.query({
            query: (id) => `/users/${id}`
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        }),
        approveUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: rest
            })
        })
    })
})

export const { 
    useLoginMutation,
    useGetAllUsersQuery,
    useGetUserQuery,
    useDeleteUserMutation,
    useApproveUserMutation
} = userApi;