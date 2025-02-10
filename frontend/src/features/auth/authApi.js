import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://cartflow-backend-production.up.railway.app"
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"],
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/user/${userId}`,
                method: "PUT",
                body: { role }
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: "/edit-profile",
                method: "PATCH",
                body: profileData
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
    }),
});

// ✅ Correct way to export
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditProfileMutation } = authApi;
export default authApi;  // ✅ Ensure this is exported
