import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Textarea } from 'flowbite-react';
import { useState } from 'react';

export default function EditReservationMenu({ reservationMenu }) {
    const [imagePreview, setImagePreview] = useState(data.image ? `/storage/${data.image}` : null);
    const [selectedReservationMenu, setReservationMenu] = useState(null);
    const { data, setData, errors, post, reset } = useForm({
        name: '',
        categoryId: '',
        description: '',
        image: null,
        limit: '',
        quota: ''
    });

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

    const editReservationMenu = (reservationMenu) => {
        setReservationMenu(reservationMenu);
        setData({
            name: reservationMenu.name,
            categoryId: reservationMenu.category.id,
            description: reservationMenu.description,
            image: null,
            limit: reservationMenu.limit,
            quota: reservationMenu.quota
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('categoryId', data.categoryId);
        formData.append('description', data.description);
        formData.append('limit', data.limit);
        formData.append('quota', data.quota);
        if (data.image) formData.append('image', data.image);

        post(`/reservation-menu/update/${selectedReservationMenu.id}`, {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setOpenEditModal(false);
                getData();
                reset();
            },
            onError: (errors) => {
                console.error('Error updating data:', errors);
            }
        });
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Edit | Reservation Menu" />

            <div className="w-full rounded-lg p-4">
                <h1 className='text-lg font-semibold'>Edit Menu</h1><hr />
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
                                <option value="" disabled>Silahkan Pilih</option>
                                {category.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
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

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        name='image'
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Display image preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Image Preview" className="w-full h-64 object-cover rounded-lg"/>
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
        </AdminLayout>
    );
}
