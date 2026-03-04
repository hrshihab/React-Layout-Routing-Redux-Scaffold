import { baseApi } from '../../api/baseApi';

type TLoginPayload = {
  id: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    needsPasswordChange?: boolean;
  };
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginPayload>({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
