import AppLayout from '@/layouts/app-layout';
import { cotizador, prospectos } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BusinessForm } from './business-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cotizador',
        href: cotizador().url,
    },
    {
        title: 'Prospectos',
        href: prospectos().url,
    },
];

export default function Prospectos() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prospectos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden bg-background md:min-h-min">
                    <BusinessForm />
                </div>
            </div>
        </AppLayout>
    );
}
