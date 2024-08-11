import Modal from "@/Components/Modal";

export default function ModalEdit({ open, onClose, data, setData, submitEdit }) {
    return (
        <Modal show={open} onClose={onClose}>
            <div className="w-full rounded-lg p-4">
                <h1 className='text-lg font-semibold'>Edit Kategori</h1><hr />
                <div className='m-2 pt-4'>
                    <form onSubmit={submitEdit}>
                        <div>
                            <label htmlFor="name" className='block'>Nama</label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className='block'>Deskripsi</label>
                            <input
                                type="text"
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:gap-4 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-lg">
                                Simpan
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-400 text-white p-2 rounded-lg">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
