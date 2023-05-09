import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'shared/config/consts'
import { IPost } from 'shared/model/Types'

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/Posts` }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({ query: () => '/GetPosts' }),
    getPost: builder.query<IPost[], void>({ query: () => '/Get' }),
    cretePost: builder.mutation({
      query: (payload) => ({
        url: '/Create',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }),
    createElectionPostDetail: builder.mutation({
      query: (payload) => ({
        url: '/CreateElectionPostDetail',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }),
    editPost: builder.mutation({
      query: (payload) => ({
        url: '/Edit',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }),
    editElectionPostDetail: builder.mutation({
      query: (payload) => ({
        url: '/EditElectionPostDetail',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }),
    deletePost: builder.mutation({
      query: (payload) => ({
        url: '/Delete',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }),

  }),
})

export const { useGetPostsQuery } = postsApi
