import { FaBellConcierge, FaInstalod, FaSwatchbook, FaUserGroup } from "react-icons/fa6";

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
    {
        key: 'category',
        path: '/category',
        icon: <FaSwatchbook />,
        label: 'Category',
    },
    {
        key: 'reservationMenu',
        path: '/reservation-menu',
        icon: <FaBellConcierge />,
        label: 'Reservation Menu',
    },
  ];
