import { TQueryParam, TResponseRedux, TSemester } from '../../../types';
import { baseApi } from '../../api/baseApi';

type TPagedResponse<T> = {
  data: T;
  meta?: TResponseRedux<T>['meta'];
};

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query<
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
          url: '/academic-semesters',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemester[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useGetAllAcademicSemestersQuery } = academicManagementApi;
