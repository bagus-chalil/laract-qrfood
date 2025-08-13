// GuestRegister.jsx
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function GuestRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        number_identity: '',
        email: '',
        no_telephone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('guest-registration'));
    };


    return (
        <GuestLayout>
            <Head title="Guest Register" />

            <form onSubmit={submit}>
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Number Identity */}
                <div className="mt-4">
                    <InputLabel htmlFor="number_identity" value="Number Identity" />
                    <TextInput
                        id="number_identity"
                        name="number_identity"
                        value={data.number_identity}
                        className="mt-1 block w-full"
                        autoComplete="number_identity"
                        onChange={(e) => setData('number_identity', e.target.value)}
                    />
                    <InputError message={errors.number_identity} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* No Telephone */}
                <div className="mt-4">
                    <InputLabel htmlFor="no_telephone" value="No Telephone" />
                    <TextInput
                        id="no_telephone"
                        type="number"
                        name="no_telephone"
                        value={data.no_telephone}
                        className="mt-1 block w-full"
                        autoComplete="no-telephone"
                        onChange={(e) => setData('no_telephone', e.target.value)}
                    />
                    <InputError message={errors.no_telephone} className="mt-2" />
                </div>

                {/* Button */}
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
