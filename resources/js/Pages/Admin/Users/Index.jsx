import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Users({ auth }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Dashboard" />
            <div>Users1</div>
        </AdminLayout>
    );
}
