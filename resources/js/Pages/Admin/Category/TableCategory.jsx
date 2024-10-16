import Modal from '@/Components/Modal';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import ModalDeleteCategory from './ModalDeleteCategory';
import ModalEditCategory from './ModalEditCategory';


export default function TableCategory({ category }) {
    const [isLoading, setIsLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const filter = useRef(category.per_page);
    const { url } = usePage();
    const willDelete = useRef();
    const [search, setSearch] = useState("");
    const { data, setData, errors, post, reset } = useForm({
        name: '',
        description: ''
    });

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

    const confirmDelete = (id) => {
        willDelete.current = id;
        setOpenDeleteModal(true);
    };

    const editCategory = (category) => {
        setSelectedCategory(category);
        setData({
            name: category.name,
            description: category.description
        });
        setOpenEditModal(true);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        post(`/category/update/${selectedCategory.id}`, {
            onSuccess: () => {
                setOpenEditModal(false);
                getData();
                reset();
            },
            onError: () => {
                // Handle error
            }
        });
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-4">
                <div>
                    <select
                        name="filter"
                        id="filter"
                        value={filter.current}
                        onChange={handleChangeFilter}
                        className='rounded-lg block p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
                <div>
                    <form onSubmit={handleSearch}>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for items"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>

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
                    {isLoading ? (
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
                    )}
                </tbody>
            </table>

            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-4">
                <div>Showing {category.from} to {category.to} total {category.total}</div>
                <div className='flex items-center gap-2'>
                    {category.links.map((link, index) => (
                        <Link
                            href={link.url}
                            key={index}
                            className='bg-blue-950 text-white p-2 text-xs rounded'
                            preserveScroll
                            preserveState>
                            <div dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    ))}
                </div>
            </div>

            <ModalDeleteCategory
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={() => {
                    setOpenDeleteModal(false);
                    getData();
                }}
                willDelete={willDelete.current}
            />

            <ModalEditCategory
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                data={data}
                setData={setData}
                submitEdit={submitEdit}
            />
        </>
    );
}
