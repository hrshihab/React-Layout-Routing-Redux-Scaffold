import type { MenuProps } from 'antd';
import type { ReactElement } from 'react';

export type TRoute = {
  path: string;
  element: ReactElement;
};

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactElement;
  children?: TUserPath[];
};

export type TSidebarItem = NonNullable<MenuProps['items']>[number];

export type TQueryParam = {
  name: string;
  value: string | number | boolean;
};

export type TMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  [key: string]: unknown;
};

export type TResponseRedux<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};

export type TName = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type TStudent = {
  _id?: string;
  id?: string;
  name?: TName;
  email?: string;
  contactNo?: string;
  [key: string]: unknown;
};

export type TSemester = {
  _id?: string;
  name?: string;
  code?: string;
  year?: string;
  status?: string;
  [key: string]: unknown;
};

export type TCourse = {
  _id?: string;
  title?: string;
  prefix?: string;
  code?: number;
  credits?: number;
  [key: string]: unknown;
};
