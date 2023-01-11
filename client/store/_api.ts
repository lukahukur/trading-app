import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const controller = new AbortController()
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    signal: controller.signal,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Login'],
  endpoints: (builder) => ({
    getLoggedIn: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/auth/signin',
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
      invalidatesTags: ['Login'],
    }),
    createAccount: builder.mutation({
      query: (body: {
        email: string
        password: string
        username: string
      }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useGetLoggedInMutation,
  useCreateAccountMutation,
  useLogoutMutation,
} = loginApi
