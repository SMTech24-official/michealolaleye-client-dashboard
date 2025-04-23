import baseApi from "@/redux/api/baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    addBanner: builder.mutation({
      query: (data) => ({
        url: "/banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
} = bookApi;
