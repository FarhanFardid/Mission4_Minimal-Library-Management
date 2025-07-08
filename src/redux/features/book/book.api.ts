import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }), // adjust port
  tagTypes: ['Books', 'Borrow'],
  endpoints: (builder) => ({
    getBooks: builder.query<any[], void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    
  }),
});

export const { useGetBooksQuery } = bookApi;
