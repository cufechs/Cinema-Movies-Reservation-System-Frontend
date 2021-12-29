import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://127.0.0.1:8000/api" 
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginInfo) => ({
                url: '/login',
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
        }),
        signupUser: builder.mutation({
            query: (user) => ({
                url: `/users/create`,
                method: 'POST',
                body: user
            })
        })
    })
})

export const { 
    useLoginMutation,
    useGetAllUsersQuery,
    useGetUserQuery,
    useDeleteUserMutation,
    useApproveUserMutation,
    useSignupUserMutation
} = userApi;