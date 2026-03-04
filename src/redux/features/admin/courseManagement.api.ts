import {
  TCourse,
  TQueryParam,
  TResponseRedux,
  TSemester,
} from '../../../types';
import { baseApi } from '../../api/baseApi';

type TPagedResponse<T> = {
  data: T;
  meta?: TResponseRedux<T>['meta'];
};

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query<
      TPagedResponse<TSemester[]>,
      TQueryParam[] | undefined
    >({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: '/semester-registrations',
          method: 'GET',
          params,
        };
      },
      providesTags: ['semester'],
      transformResponse: (response: TResponseRedux<TSemester[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    addRegisteredSemester: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/semester-registrations/create-semester-registration',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['semester'],
    }),
    updateRegisteredSemester: builder.mutation<
      unknown,
      { id: string; data: unknown }
    >({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['semester'],
    }),
    getAllCourses: builder.query<TPagedResponse<TCourse[]>, TQueryParam[] | undefined>(
      {
        query: (args) => {
          const params = new URLSearchParams();

          if (args) {
            args.forEach((item) => {
              params.append(item.name, String(item.value));
            });
          }

          return {
            url: '/courses',
            method: 'GET',
            params,
          };
        },
        providesTags: ['courses'],
        transformResponse: (response: TResponseRedux<TCourse[]>) => ({
          data: response.data,
          meta: response.meta,
        }),
      }
    ),
    addCourse: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/courses/create-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['courses'],
    }),
    addFaculties: builder.mutation<
      unknown,
      { courseId: string; data: unknown }
    >({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['courses'],
    }),
    getCourseFaculties: builder.query<TPagedResponse<unknown>, string>({
      query: (id) => ({
        url: `/courses/${id}/get-faculties`,
        method: 'GET',
      }),
      transformResponse: (response: TResponseRedux<unknown>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    createOfferedCourse: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/offered-courses/create-offered-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['courses'],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferedCourseMutation,
} = courseManagementApi;
