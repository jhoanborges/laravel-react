import AppLayout from '@/layouts/app-layout';
import { cotizador, dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CotizadorForm from './cotizador-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Cotizador',
        href: cotizador().url,
    },
];

export default function Cotizador() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cotizador" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden bg-background md:min-h-min">
                    <CotizadorForm />
                </div>
            </div>
        </AppLayout>
    );
}
