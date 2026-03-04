import { TQueryParam, TResponseRedux } from '../../../types';
import { TOfferedCourse } from '../../../types/studentCourse.type';
import { baseApi } from '../../api/baseApi';

type TPagedResponse<T> = {
  data: T;
  meta?: TResponseRedux<T>['meta'];
};

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query<
      TPagedResponse<TOfferedCourse[]>,
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
          url: '/offered-courses/my-offered-courses',
          method: 'GET',
          params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getAllEnrolledCourses: builder.query<TPagedResponse<unknown>, TQueryParam[] | undefined>(
      {
        query: (args) => {
          const params = new URLSearchParams();

          if (args) {
            args.forEach((item) => {
              params.append(item.name, String(item.value));
            });
          }
          return {
            url: '/enrolled-courses/my-enrolled-courses',
            method: 'GET',
            params,
          };
        },
        providesTags: ['offeredCourse'],
        transformResponse: (response: TResponseRedux<unknown>) => ({
          data: response.data,
          meta: response.meta,
        }),
      }
    ),
    enrolCourse: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/enrolled-courses/create-enrolled-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['offeredCourse'],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  useEnrolCourseMutation,
  useGetAllEnrolledCoursesQuery,
} = studentCourseApi;
