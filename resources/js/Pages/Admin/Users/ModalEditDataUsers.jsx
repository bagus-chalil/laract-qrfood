import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";

export default function ModalEditDataUsers({ open, onClose, data, setData, submitEdit }) {

    const handleTelephoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setData('no_telephone', value);
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="w-full rounded-lg p-4">
                <h1 className='text-lg font-semibold'>Edit Kategori</h1><hr />
                <div className='m-2 pt-4'>
                    <form onSubmit={submitEdit}>
                        <div>
                            <InputLabel htmlFor="name" className='block'>Nama</InputLabel>
                            <TextInput
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>

                        <div className='mt-4 mb-8'>
                            <InputLabel htmlFor="no_telephone" value="No Telephone" />

                            <TextInput
                                id="no_telephone"
                                name="no_telephone"
                                type="tel"
                                value={data.no_telephone}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={handleTelephoneChange}
                            />
                        </div>
                        <div className="flex items-center justify-end space-y-4 sm:space-y-0 sm:gap-4 mt-4">
                            <button
                                onClick={onClose}
                                className="bg-gray-400 text-white p-2 rounded-lg">
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-lg justify-end">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
