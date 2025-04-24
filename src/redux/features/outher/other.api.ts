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

    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getPoins: builder.query({
      query: () => ({
        url: "/point",
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    addPoins: builder.mutation({
      query: (data) => ({
        url: "/point",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rewards"],
    }),

    deletePoins: builder.mutation({
      query: (id) => ({
        url: `/point/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rewards"],
    }),

    getRedeem: builder.query({
      query: () => ({
        url: "/redeem",
        method: "GET",
      }),
      providesTags: ["Redeem"],
    }),

    addRedeem: builder.mutation({
      query: (data) => ({
        url: "/redeem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Redeem"],
    }),

    deleteRedeem: builder.mutation({
      query: (id) => ({
        url: `/redeem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Redeem"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetPoinsQuery,
  useAddPoinsMutation,
  useDeletePoinsMutation,
  useAddRedeemMutation,
  useGetRedeemQuery,
  useDeleteRedeemMutation,
} = bookApi;
