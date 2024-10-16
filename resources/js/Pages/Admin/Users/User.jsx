import TableUsers from './TableUsers';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalAddDataUser from './ModalAddDataUsers';

export default function User({ auth, dataUser, sessions }) {
    const [openModal, setOpenModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        no_telephone: '',
        with_role: 0,
        with_email: 0,
        with_wa: 0,
    });

    const closeModal = () => {
        setOpenModal(false);
        reset('name', 'email', 'no_telephone', 'with_role', 'with_email', 'with_wa');
    };

    const appendAlert = () => {
        setShowAlert(true);
    };

    const submit = (e) => {
        e.preventDefault();

        post('/users/insert', {
            onSuccess: () => {
                closeModal();
                appendAlert();
            },
            onError: () => {
                setShowAlert(false);
            },
        });
    };

    useEffect(() => {
        if (sessions.message) {
            setShowAlert(true);
        }
    }, [sessions]);

    return (
        <AdminLayout auth={auth}>
            <Head title="Users" />

            {/* CONTENT */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {showAlert && (
                    <div id="alert-border-1"
                        className="flex items-center p-4 m-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {sessions.message}
                        </div>
                        <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                            onClick={() => setShowAlert(false)}
                            aria-label="Close">
                            <span className="sr-only">Dismiss</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-4 mb-auto">
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 ml-auto overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-950 group-hover:from-blue-400 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-blue-800"
                        onClick={() => setOpenModal(true)}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Tambah
                        </span>
                    </button>
                </div>

                <TableUsers dataUser={dataUser} />
            </div>
            {/* END CONTENT */}

            {/* MODAL */}
            <ModalAddDataUser
                open={openModal}
                onClose={closeModal}
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
            />
            {/* END MODAL */}
        </AdminLayout>
    );
}
