import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { toast } from 'sonner';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const getErrorMessage = (error: FetchBaseQueryError): string => {
  const data = error.data;
  if (data && typeof data === 'object' && 'message' in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === 'string') {
      return message;
    }
  }
  return 'Request failed';
};

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 404 || result.error?.status === 403) {
    toast.error(getErrorMessage(result.error));
  }

  if (result.error?.status === 401) {
    const refreshResponse = await fetch(
      'http://localhost:5000/api/v1/auth/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    const refreshData = await refreshResponse.json();

    if (refreshData?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: refreshData.data.accessToken as string,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['semester', 'courses', 'offeredCourse'],
  endpoints: () => ({}),
});
