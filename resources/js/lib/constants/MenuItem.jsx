import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

const linkClass = 'flex items-center p-2 text-xl text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'

const MenuItem = ({ item }) => {

  return (
    <li>
      <SidebarLink key={item.key} link={item} />
      {/* <a
        href={item.href}
        className=""
      > */}
        {/* <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )} */}
      {/* </a> */}
    </li>
  );
}

function SidebarLink({ link }) {
    const { url, component } = usePage();

    return (
        <Link
            href={link.path}
            className={classNames(url.startsWith(link.path) ? 'bg-blue-950 text-white' : 'text-neutral-900', linkClass)}
        >
            {/* <span className="text-xl">{link.icon}</span> */}
             {link.label}
        </Link>
    )
}

export default MenuItem;
