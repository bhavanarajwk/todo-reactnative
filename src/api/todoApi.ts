import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todos'],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos?_limit=10',
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),

    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
