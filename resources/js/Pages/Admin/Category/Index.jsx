import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Dashboard" />
            <div>Dashboard</div>
        </AdminLayout>
    );
}
