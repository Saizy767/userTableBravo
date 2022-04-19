import { tableUser } from './../../dataLayouts/TableColumns';
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export type allTableUser = tableUser & {Age:number}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    tagTypes:['POST'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<tableUser[], unknown>({
            query: () => ({
                url:'/users',
                params:{
                    _sort: 'id',
                    _order: 'asc',
                }
            }),
            providesTags: () =>['POST'],
        }),
        postUsers: build.mutation<allTableUser, allTableUser>({
            query: (user) => ({
                url:'/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['POST']
        }),
        putUsers: build.mutation<allTableUser, allTableUser>({
            query: (user) => ({
                url:`/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['POST']
        }),
        deleteUsers: build.mutation<allTableUser, allTableUser>({
            query: (user) => ({
                url:`/users/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['POST']
        }),
    })
})  