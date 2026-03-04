import { TQueryParam, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

type TPagedResponse<T> = {
  data: T;
  meta?: TResponseRedux<T>['meta'];
};

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCourses: builder.query<TPagedResponse<unknown>, TQueryParam[] | undefined>({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: '/faculties/my-courses',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<unknown>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useGetMyCoursesQuery } = facultyCourseApi;
