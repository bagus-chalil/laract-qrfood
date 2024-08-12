// src/components/MainLayout.jsx
import Alert from '@/Components/Alert';
import Header from '@/Components/shared/Header';
import Sidebar from '@/Components/shared/Sidebar';
import React from 'react';


const MainLayout = ({ children }) => (
  <div>
    <Alert />
    <Header />
    <Sidebar />
    <div className="p-4 sm:ml-64 min-h-screen">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {children}
      </div>
    </div>
  </div>
);

export default MainLayout;
