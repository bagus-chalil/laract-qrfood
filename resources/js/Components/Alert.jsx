import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';

const Alert = () => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.alert) {
            Swal.fire({
                icon: flash.alert.type,
                title: flash.alert.type === 'error' ? 'Oops...' : 'Success!',
                text: flash.alert.message,
            });
        }
    }, [flash]);

    return null; // Komponen ini tidak menampilkan apa pun secara langsung
};

export default Alert;
