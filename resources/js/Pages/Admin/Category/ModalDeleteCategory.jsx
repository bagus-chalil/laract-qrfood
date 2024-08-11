import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';

export default function ModalDeleteCategory({ open, onClose, onDelete, willDelete }) {
    return (
        <Modal show={open} onClose={onClose}>
            <div className="py-4 rounded-lg">
                <p className='py-4 text-center'>Apakah Anda yakin ingin menghapus Data?</p>
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-4 mb-auto mt-10">
                    <button
                        onClick={onClose}
                        className='bg-gray-400 py-1 px-2 rounded-lg text-white'>
                        Batal
                    </button>
                    <Link
                        preserveScroll
                        preserveState
                        method='delete'
                        href="/category/destroy"
                        data={{ id: willDelete }}
                        onSuccess={onDelete}
                        className='bg-red-400 py-1 px-2 rounded-lg text-white'>
                        Hapus
                    </Link>
                </div>
            </div>
        </Modal>
    );
}
