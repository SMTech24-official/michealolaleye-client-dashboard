import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/book",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Book"],
    }),

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: (agrs) => ({
        url: `/book/${agrs.id}`,
        method: "PUT",
        body: agrs.data,
      }),
      invalidatesTags: ["Book"],
    }),

    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),

    getRecomendedBooks: builder.query({
      query: () => ({
        url: "/book/recommended",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),

    addRecomendedBook: builder.mutation({
      query: (data) => ({
        url: `/book/add-recommended`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),

    getBestSellingBooks: builder.query({
      query: () => ({
        url: "/book/best-selling",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useAddBookMutation,
  useAddRecomendedBookMutation,
  useGetBestSellingBooksQuery,
  useGetRecomendedBooksQuery,
} = bookApi;
