import {createApi,fetchBaseQuery,} from '@reduxjs/toolkit/query/react';
import {HYDRATE} from 'next-redux-wrapper'

const controller = new AbortController();
export const loginApi = createApi({
    reducerPath:'loginApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',signal:controller.signal}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
      tagTypes:['Login'],
    endpoints: (builder)=>({
        getLoggedIn: builder.mutation({
           query:(body:{email:string,password:string})=>({
            url:'/api/login',
            method:'POST',
            body:body,
            credentials:'include',
           }),
           invalidatesTags:['Login']
        
        }),
    }),
});


export const {useGetLoggedInMutation} =  loginApi;