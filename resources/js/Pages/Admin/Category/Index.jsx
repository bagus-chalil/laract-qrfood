import AdminLayout from '@/Layouts/AdminLayout';
import TableCategory from './TableCategory';
import { Head } from '@inertiajs/react';

export default function Category({ auth, category }) {

    return (
        <AdminLayout auth={auth}>
            <Head title="Category" />

            {/* CONTENT */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-4 mb-auto">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 ml-auto overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Cyan to blue
                        </span>
                    </button>
                </div>

                <TableCategory category={category}/>
            </div>
            {/* END CONTENT */}
        </AdminLayout>
    );
}
