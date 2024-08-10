// src/components/MainLayout.jsx
import Header from '@/Components/shared/Header';
import Sidebar from '@/Components/shared/Sidebar';
import React from 'react';


const MainLayout = ({ children }) => (
  <div>
    <Header />
    <Sidebar />
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {children}
      </div>
    </div>
  </div>
);

export default MainLayout;
