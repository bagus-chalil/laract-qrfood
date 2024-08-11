import { FaInstalod, FaUserGroup } from "react-icons/fa6";

export const SIDEBAR_ITEMS = [
    {
        key: 'dashboard',
        path: '/dashboard',
        icon: <FaInstalod />,
        label: 'Dashboard',
    },
    {
        key: 'users',
        path: '/users',
        icon: <FaUserGroup />,
        label: 'Users',
    },
  ];
