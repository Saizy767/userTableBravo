import { IFormInput, IUser } from './../../pages/LoginPage';
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const registrationAPI = createApi({
    reducerPath: 'registrationAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://6256d6ab6ea70370054053f3.mockapi.io/logins'}),
    tagTypes:['POST'],
    endpoints: (build) => ({
        fetchAllRegistration: build.query<IUser[], unknown>({
            query: () => ({
                url:'/Registration'
            }),
            providesTags: () => ['POST'],
        }),
        postRegistration: build.mutation<IFormInput, IFormInput>({
            query: (user) => ({
                url:'/Registration',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['POST']
        }),
    })
})  