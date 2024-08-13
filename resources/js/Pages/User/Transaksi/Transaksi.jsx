import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';

const Transaksi = ({ auth, transactions  }) => {
    const [search, setSearch] = useState("");
    const filter = useRef(transactions.per_page);

    const handleChangeFilter = (e) => {
        filter.current = e.target.value;
        getData();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getData();
    };

    const getData = () => {
        setIsLoading(true);
        router.get(url, {
            filter: filter.current,
            search: search
        }, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                console.error('Error fetching data:', errors);
                setIsLoading(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <Head title="QR Code Scanner" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg mb-4">

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6">#</th>
                                <th scope="col" className="px-6 py-3">Nama</th>
                                <th scope="col" className="px-6 py-3">Deskripsi</th>
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {isLoading ? (
                                <tr>
                                    <td>Loading..</td>
                                </tr>
                            ) : (
                                category.data.map((item, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                                        <td className="px-6 py-4">{category.from + index}</td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4 text-left rtl:text-center">
                                            <div className="flex items-center gap-2 rounded">
                                                <button onClick={() => editCategory(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                                <button className='bg-red-400 text-white p-1 rounded' onClick={() => confirmDelete(item.id)}>
                                                    <FaRegTrashCan />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )} */}
                        </tbody>
                    </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Transaksi;
