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
            query: (id) => ({
                url: `/users/approve/${id}`,
                method: 'PUT'
            })
        }),
        signupUser: builder.mutation({
            query: (user) => ({
                url: `/users/create`,
                method: 'POST',
                body: user
            })
        }),
        getUserReservations: builder.query({
            query: (id) => ({
                url: `/moviereservations/reservation/${id}`
            }),
            transformResponse: response => {
                let res = []
                let movieReservations = response.moviereservations;
                
                for (let i = 0; i < movieReservations.length; i++) {
                    let reservation = movieReservations[i];
                    let { id, ...reserv } = reservation;
                    res.push({...reserv, ...reserv.pivot, moviereservationId: id, id: i})
                }
                //console.log("res: ", res)
                if (res.length >= 1 && res[0].seat_no) {
                    console.log("seat_no: ", JSON.parse(res[0].seat_no).seat_no)
                    res[0].seat_no = JSON.parse(res[0].seat_no).seat_no
                }
                console.log('response: ', movieReservations);
                response.moviereservations = res;
                return response;
            }
        }),
        deleteReservation: builder.mutation({
            query: ({userId, moviereservationId}) => ({
                url: `http://127.0.0.1:8000/api/moviereservations/delete/${userId}`,
                method: 'PUT',
                body: {
                    id: moviereservationId
                }
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
    useSignupUserMutation,
    useGetUserReservationsQuery,
    useDeleteReservationMutation
} = userApi;