import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Textarea } from 'flowbite-react';
import { useState } from 'react';

export default function ModalAddReservationMenu({ open, onClose, data, category, setData, submit, processing, errors }) {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleQuotaChange = (e) => {
        const quotaValue = e.target.value;
        if (quotaValue < data.limit) {
            setData('quota', quotaValue);
        } else {
            alert('Quota tidak boleh lebih besar dari Limit');
        }
    };

    const handleClose = () => {
        onClose();
        setImagePreview(null);
    };

    return (
        <Modal show={open} onClose={handleClose}>
            <div className="w-full rounded-lg p-4">
                <h1 className='text-lg font-semibold'>Tambah Menu</h1><hr />
                <div className='m-2 pt-4'>
                    <form onSubmit={submit}>
                        {/* Kategori */}
                        <div className="mt-4">
                            <InputLabel htmlFor="categoryId" value="CategoryId" />

                            <select
                                name="categoryId"
                                id="categoryId"
                                value={data.categoryId}
                                onChange={(e) => setData('categoryId', e.target.value)}
                                className='rounded-lg mt-1 block w-full'>
                                <option value="" disabled>Select a category</option> {/* Default option */}
                                {category.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <InputError message={errors.categoryId} className="mt-2" />
                        </div>

                        {/* Nama Menu */}
                        <div className="mt-4">
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

                        {/* Deskripsi */}
                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Description" />

                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Upload Image */}
                        <div className='mt-4'>
                            <InputLabel htmlFor="image" value="Image" />

                            <input
                                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="image"
                                name='image'
                                type="file"
                                onChange={handleFileChange} />

                            {/* Display image preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Image Preview" className="w-full h-64 object-cover rounded-lg" />
                                </div>
                            )}
                        </div>

                        {/* Input Limit dan Quota */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <div className="mt-4">
                                <InputLabel htmlFor="limit" value="Limit" />

                                <TextInput
                                    id="limit"
                                    name="limit"
                                    type="number"
                                    min="0"
                                    value={data.limit}
                                    className="mt-1 block w-full"
                                    autoComplete="limit"
                                    onChange={(e) => setData('limit', e.target.value)}
                                />

                                <InputError message={errors.limit} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="quota" value="Quota" />

                                <TextInput
                                    id="quota"
                                    name="quota"
                                    type="number"
                                    min="0"
                                    value={data.quota}
                                    className="mt-1 block w-full"
                                    autoComplete="quota"
                                    onChange={handleQuotaChange}
                                />

                                <InputError message={errors.quota} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
