import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    blackUser: builder.mutation({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    sendNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/send-notification`,
        method: "POST",
        body: data,
      }),
    }),

    deteleUser: builder.mutation({
      query: (data) => ({
        url: `/users/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    orderList: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/purchase",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useBlackUserMutation,
  useSendNotificationMutation,
  useDeteleUserMutation,
  useOrderListQuery,
} = userApi;
