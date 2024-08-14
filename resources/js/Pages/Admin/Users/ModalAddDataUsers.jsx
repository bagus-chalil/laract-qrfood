import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function ModalAddDataUsers({ open, onClose, data, setData, submit, processing, errors }) {

    const handleTelephoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setData('no_telephone', value);
    };

    return (
        <Modal show={open} onClose={onClose}>
            <div className="w-full rounded-lg p-4">
                <h1 className='text-lg font-semibold'>Tambah User</h1><hr />
                <div className='m-2 pt-4'>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className='mt-4 mb-8'>
                            <InputLabel htmlFor="no_telephone" value="No Telephone" />

                            <TextInput
                                id="no_telephone"
                                name="no_telephone"
                                type="tel"
                                value={data.no_telephone}
                                className="mt-1 block w-full"
                                autoComplete="no_telephone"
                                isFocused={true}
                                onChange={handleTelephoneChange}
                            />

                            <InputError message={errors.no_telephone} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                {processing && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16v4c4.627 0 8-3.373 8-8h-4a4 4 0 01-4 4z"
                                        ></path>
                                    </svg>
                                )}
                                Simpan
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
