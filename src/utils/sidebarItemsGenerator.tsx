import { NavLink } from 'react-router-dom';
import { TSidebarItem, TUserPath } from '../types';

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children && item.name) {
      const childItems = item.children
        .filter((child) => child.name && child.path)
        .map((child) => ({
          key: child.name as string,
          label: (
            <NavLink to={`/${role}/${child.path as string}`}>{child.name}</NavLink>
          ),
        }));

      if (childItems.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          children: childItems,
        });
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};