import { TQueryParam, TResponseRedux, TStudent } from '../../../types';
import { baseApi } from '../../api/baseApi';

type TPagedResponse<T> = {
  data: T;
  meta?: TResponseRedux<T>['meta'];
};

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query<TPagedResponse<TStudent[]>, TQueryParam[] | undefined>(
      {
        query: (args) => {
          const params = new URLSearchParams();

          if (args) {
            args.forEach((item) => {
              params.append(item.name, String(item.value));
            });
          }

          return {
            url: '/students',
            method: 'GET',
            params,
          };
        },
        transformResponse: (response: TResponseRedux<TStudent[]>) => ({
          data: response.data,
          meta: response.meta,
        }),
      }
    ),
    getAllFaculties: builder.query<TPagedResponse<TStudent[]>, TQueryParam[] | undefined>(
      {
        query: (args) => {
          const params = new URLSearchParams();

          if (args) {
            args.forEach((item) => {
              params.append(item.name, String(item.value));
            });
          }

          return {
            url: '/faculties',
            method: 'GET',
            params,
          };
        },
        transformResponse: (response: TResponseRedux<TStudent[]>) => ({
          data: response.data,
          meta: response.meta,
        }),
      }
    ),
    addStudent: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<unknown, { oldPassword: string; newPassword: string }>(
      {
        query: (data) => ({
          url: '/auth/change-password',
          method: 'POST',
          body: data,
        }),
      }
    ),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
  useChangePasswordMutation,
} = userManagementApi;
