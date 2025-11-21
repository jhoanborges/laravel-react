'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NumberInput } from '@/lib/number-format';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    addCotizadorContact,
    deleteCotizadorContact,
    loadMockClient,
    setActiveArrendamientoTab,
    setActiveMainTab,
    setActiveSubTab,
    setClientSearchOpen,
    setTasaTopeEnabled,
    setTipoArrendamiento,
    updateCriterios,
    type ClientData,
    type ContactData,
    type PhoneData,
} from '@/redux/slices';
import { Check, ChevronsUpDown, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Bienes from './bienes';
import DatosGeneralesLinea from './datos-generales-linea';
import FinancialDetails from './financial-details';
import PagoInicial from './pago-inicial';

const mockClients: Array<
    ClientData & { phones: PhoneData[]; contacts: ContactData[] }
> = [
    {
        value: 'rene-martinez',
        label: 'RENE DAVID G. MARTINEZ GARZA',
        rfc: 'MAGR860218-KE3',
        curp: 'MAGR860218HNLRRN18',
        personalidadFiscal: 'Persona Física (Crédito al Consumo)',
        email: 'davilmtz@gmail.com',
        nacionalidad: 'MEXICANA',
        fechaNacimiento: '1986-02-18',
        direccion: 'RIO ORINOCO 114-15 OTE COL. Del Valle',
        ciudad: 'SAN PEDRO GARZA GARCIA, NUEVO LEON, MEXICO',
        codigoPostal: '66220',
        politicamenteExpuesto: 'NO',
        phones: [
            { tipo: 'OFICINA', telefono: '8184667473' },
            { tipo: 'CASA', telefono: '83351443' },
            { tipo: 'FAX', telefono: '/' },
            { tipo: 'CELULAR', telefono: '/' },
        ],
        contacts: [
            { contacto: 'Juan Pérez', tipoContacto: 'Gerente' },
            { contacto: 'María López', tipoContacto: 'Asistente' },
        ],
    },
    {
        value: 'juan-perez',
        label: 'JUAN PEREZ LOPEZ',
        rfc: 'PELJ850315-AB2',
        curp: 'PELJ850315HDFRPN08',
        personalidadFiscal: 'Persona Física (Crédito al Consumo)',
        email: 'juan.perez@email.com',
        nacionalidad: 'MEXICANA',
        fechaNacimiento: '1985-03-15',
        direccion: 'AV. UNIVERSIDAD 1000',
        ciudad: 'MONTERREY, NUEVO LEON, MEXICO',
        codigoPostal: '64000',
        politicamenteExpuesto: 'NO',
        phones: [
            { tipo: 'OFICINA', telefono: '8112345678' },
            { tipo: 'CASA', telefono: '8198765432' },
            { tipo: 'FAX', telefono: '8111111111' },
            { tipo: 'CELULAR', telefono: '8112223333' },
        ],
        contacts: [
            { contacto: 'Carlos Ruiz', tipoContacto: 'Contador' },
            { contacto: 'Ana García', tipoContacto: 'Secretaria' },
        ],
    },
    {
        value: 'maria-gonzalez',
        label: 'MARIA GONZALEZ RODRIGUEZ',
        rfc: 'GORM900520-CD4',
        curp: 'GORM900520MDFNDR05',
        personalidadFiscal: 'Persona Moral',
        email: 'maria.gonzalez@email.com',
        nacionalidad: 'MEXICANA',
        fechaNacimiento: '1990-05-20',
        direccion: 'CALLE HIDALGO 500',
        ciudad: 'GUADALAJARA, JALISCO, MEXICO',
        codigoPostal: '44100',
        politicamenteExpuesto: 'NO',
        phones: [
            { tipo: 'OFICINA', telefono: '3312345678' },
            { tipo: 'CASA', telefono: '3398765432' },
            { tipo: 'FAX', telefono: '3311111111' },
            { tipo: 'CELULAR', telefono: '3312223333' },
        ],
        contacts: [
            { contacto: 'Pedro Martínez', tipoContacto: 'Director' },
            { contacto: 'Laura Sánchez', tipoContacto: 'Administradora' },
        ],
    },
];

export default function CotizadorForm() {
    const dispatch = useAppDispatch();

    // Select state from Redux
    const activeMainTab = useAppSelector(
        (state) => state.cotizador.ui.activeMainTab,
    );
    const activeSubTab = useAppSelector(
        (state) => state.cotizador.ui.activeSubTab,
    );
    const activeArrendamientoTab = useAppSelector(
        (state) => state.cotizador.ui.activeArrendamientoTab,
    );
    const openClientSearch = useAppSelector(
        (state) => state.cotizador.ui.clientSearchOpen,
    );
    const selectedClient = useAppSelector(
        (state) => state.cotizador.form.selectedClient,
    );
    const clientData = useAppSelector(
        (state) => state.cotizador.form.clientData,
    );
    const phones = useAppSelector((state) => state.cotizador.form.phones);
    const contacts = useAppSelector((state) => state.cotizador.form.contacts);
    const tasaTopeEnabled = useAppSelector(
        (state) => state.cotizador.form.criterios.tasaTope.enabled,
    );
    const tipoArrendamiento = useAppSelector(
        (state) => state.cotizador.form.tipoArrendamiento,
    );
    const criterios = useAppSelector((state) => state.cotizador.form.criterios);

    // Load initial mock client data on mount
    useEffect(() => {
        if (!selectedClient && mockClients.length > 0) {
            const firstClient = mockClients[0];
            dispatch(
                loadMockClient({
                    client: {
                        value: firstClient.value,
                        label: firstClient.label,
                        rfc: firstClient.rfc,
                        curp: firstClient.curp,
                        personalidadFiscal: firstClient.personalidadFiscal,
                        email: firstClient.email,
                        nacionalidad: firstClient.nacionalidad,
                        fechaNacimiento: firstClient.fechaNacimiento,
                        direccion: firstClient.direccion,
                        ciudad: firstClient.ciudad,
                        codigoPostal: firstClient.codigoPostal,
                        politicamenteExpuesto:
                            firstClient.politicamenteExpuesto,
                    },
                    phones: firstClient.phones,
                    contacts: firstClient.contacts,
                }),
            );
        }
    }, [dispatch, selectedClient]);

    const handleClientSelect = (clientValue: string) => {
        const client = mockClients.find((c) => c.value === clientValue);
        if (client) {
            dispatch(
                loadMockClient({
                    client: {
                        value: client.value,
                        label: client.label,
                        rfc: client.rfc,
                        curp: client.curp,
                        personalidadFiscal: client.personalidadFiscal,
                        email: client.email,
                        nacionalidad: client.nacionalidad,
                        fechaNacimiento: client.fechaNacimiento,
                        direccion: client.direccion,
                        ciudad: client.ciudad,
                        codigoPostal: client.codigoPostal,
                        politicamenteExpuesto: client.politicamenteExpuesto,
                    },
                    phones: client.phones,
                    contacts: client.contacts,
                }),
            );
        }
        dispatch(setClientSearchOpen(false));
    };

    return (
        <div className="w-full space-y-4 p-4">
            {/* Top Navigation Tabs */}
            <Tabs
                value={activeMainTab}
                onValueChange={(value) =>
                    dispatch(setActiveMainTab(value as any))
                }
                className="w-full"
            >
                <TabsList className="inline-flex h-auto w-full flex-wrap items-center justify-start gap-1 bg-secondary/20 p-1">
                    <TabsTrigger value="proyecto">Proyecto/Cliente</TabsTrigger>
                    <TabsTrigger disabled value="lineas">
                        Líneas
                    </TabsTrigger>
                    <TabsTrigger disabled value="operaciones">
                        Operaciones
                    </TabsTrigger>
                    <TabsTrigger disabled value="cotizaciones">
                        Cotizaciones
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="proyecto" className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            {/* Datos Generales and Phone/Contacts Grid */}
                            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {/* Left: Datos Generales */}
                                <div className="space-y-4 lg:col-span-2">
                                    <h3 className="border-b pb-2 font-semibold text-primary">
                                        Datos Generales
                                    </h3>

                                    {/* Cliente */}
                                    <div className="space-y-2">
                                        <Label>Cliente:</Label>
                                        <Popover
                                            open={openClientSearch}
                                            onOpenChange={(open) =>
                                                dispatch(
                                                    setClientSearchOpen(open),
                                                )
                                            }
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={
                                                        openClientSearch
                                                    }
                                                    className="w-full justify-between"
                                                >
                                                    {selectedClient
                                                        ? mockClients.find(
                                                              (client) =>
                                                                  client.value ===
                                                                  selectedClient,
                                                          )?.label
                                                        : 'Seleccionar cliente...'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Buscar cliente..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No se encontró
                                                            cliente.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {mockClients.map(
                                                                (client) => (
                                                                    <CommandItem
                                                                        key={
                                                                            client.value
                                                                        }
                                                                        value={
                                                                            client.value
                                                                        }
                                                                        onSelect={
                                                                            handleClientSelect
                                                                        }
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                selectedClient ===
                                                                                    client.value
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        <div className="flex flex-col">
                                                                            <span>
                                                                                {
                                                                                    client.label
                                                                                }
                                                                            </span>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {
                                                                                    client.rfc
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* RFC and CURP */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>RFC:</Label>
                                            <Input
                                                value={clientData?.rfc || ''}
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Curp:</Label>
                                            <Input
                                                value={clientData?.curp || ''}
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                    </div>

                                    {/* Personalidad Fiscal */}
                                    <div className="space-y-2">
                                        <Label>Personalidad Fiscal:</Label>
                                        <Input
                                            value={
                                                clientData?.personalidadFiscal ||
                                                ''
                                            }
                                            readOnly
                                            className="bg-muted"
                                        />
                                    </div>

                                    {/* Correo Electrónico and Políticamente Expuesto */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Correo Electrónico:</Label>
                                            <Input
                                                value={clientData?.email || ''}
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>
                                                Políticamente Expuesto:
                                            </Label>
                                            <Input
                                                value={
                                                    clientData?.politicamenteExpuesto ||
                                                    ''
                                                }
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                    </div>

                                    {/* Nacionalidad and Fecha Nacimiento */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Nacionalidad:</Label>
                                            <Input
                                                value={
                                                    clientData?.nacionalidad ||
                                                    ''
                                                }
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Fecha Nacimiento:</Label>
                                            <Input
                                                type="date"
                                                value={
                                                    clientData?.fechaNacimiento ||
                                                    ''
                                                }
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="space-y-2">
                                        <Label>Dirección:</Label>
                                        <Input
                                            value={clientData?.direccion || ''}
                                            readOnly
                                            className="bg-muted"
                                        />
                                    </div>

                                    {/* Ciudad */}
                                    <div className="space-y-2">
                                        <Input
                                            value={clientData?.ciudad || ''}
                                            readOnly
                                            className="bg-muted"
                                        />
                                    </div>

                                    {/* Código Postal */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Código Postal:</Label>
                                            <Input
                                                value={
                                                    clientData?.codigoPostal ||
                                                    ''
                                                }
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>

                                        {/* Product Type solo haremos arrendamiento-financiero
                 si cambia este valor, entonces vambia la logica y la llamada api, pendiente
                 */}
                                        <div>
                                            <Label>
                                                Tipo de arrendamiento:
                                            </Label>

                                            <Select
                                                value={tipoArrendamiento}
                                                onValueChange={(value) =>
                                                    dispatch(
                                                        setTipoArrendamiento(
                                                            value as any,
                                                        ),
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="arrendamiento-financiero">
                                                        ARRENDAMIENTO FINANCIERO
                                                    </SelectItem>
                                                    <SelectItem
                                                        disabled
                                                        value="credito-simple"
                                                    >
                                                        CRÉDITO SIMPLE
                                                    </SelectItem>
                                                    <SelectItem
                                                        disabled
                                                        value="arrendamiento-puro"
                                                    >
                                                        ARRENDAMIENTO PURO
                                                    </SelectItem>
                                                    <SelectItem
                                                        disabled
                                                        value="prestamo-refaccionario"
                                                    >
                                                        PRÉSTAMO REFACCIONARIO
                                                    </SelectItem>
                                                    <SelectItem
                                                        disabled
                                                        value="credito-automotriz"
                                                    >
                                                        CRÉDITO AUTOMOTRIZ
                                                    </SelectItem>
                                                    <SelectItem
                                                        disabled
                                                        value="ap-prog-entrega"
                                                    >
                                                        AP PROG ENTREGA
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Teléfonos and Contactos */}
                                <div className="space-y-6">
                                    {/* Teléfonos Table */}
                                    <div>
                                        <h3 className="mb-4 border-b pb-2 text-center font-semibold text-primary">
                                            Teléfonos
                                        </h3>
                                        <div className="overflow-hidden rounded-lg border">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-medium">
                                                            Tipo
                                                        </th>
                                                        <th className="px-3 py-2 text-left font-medium">
                                                            Teléfono
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {phones.map(
                                                        (phone, index) => (
                                                            <tr
                                                                key={index}
                                                                className="border-t"
                                                            >
                                                                <td className="px-3 py-2">
                                                                    {phone.tipo}
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    <Input
                                                                        value={
                                                                            phone.telefono
                                                                        }
                                                                        readOnly
                                                                        className="h-8 bg-muted"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Contactos Table */}
                                    <div>
                                        <h3 className="mb-4 border-b pb-2 text-center font-semibold text-primary">
                                            Contactos
                                        </h3>
                                        <div className="mb-2 flex justify-end">
                                            <Button
                                                onClick={() =>
                                                    dispatch(
                                                        addCotizadorContact({
                                                            contacto: '',
                                                            tipoContacto: '',
                                                        }),
                                                    )
                                                }
                                                size="sm"
                                                variant="outline"
                                            >
                                                Agregar
                                            </Button>
                                        </div>
                                        <div className="overflow-hidden rounded-lg border">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-medium">
                                                            Contacto
                                                        </th>
                                                        <th className="px-3 py-2 text-left font-medium">
                                                            Tipo de Contacto
                                                        </th>
                                                        <th className="w-12 px-3 py-2 text-center font-medium"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {contacts.map(
                                                        (contact, index) => (
                                                            <tr
                                                                key={index}
                                                                className="border-t"
                                                            >
                                                                <td className="px-3 py-2">
                                                                    <Input
                                                                        value={
                                                                            contact.contacto
                                                                        }
                                                                        readOnly
                                                                        className="h-8 bg-muted"
                                                                    />
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    <Input
                                                                        value={
                                                                            contact.tipoContacto
                                                                        }
                                                                        readOnly
                                                                        className="h-8 bg-muted"
                                                                    />
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                deleteCotizadorContact(
                                                                                    index,
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="h-8 w-8 p-0"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Arrendamiento Financiero Section */}
                            <div className="space-y-4 border-t pt-6">
                                <Tabs
                                    value={activeSubTab}
                                    onValueChange={(value) =>
                                        dispatch(setActiveSubTab(value as any))
                                    }
                                >
                                    <TabsList className="bg-secondary/20">
                                        <TabsTrigger value="arrendamiento">
                                            Arrendamiento
                                        </TabsTrigger>
                                        <TabsTrigger value="tabla">
                                            Tabla de Amortización
                                        </TabsTrigger>
                                        <TabsTrigger disabled value="garantias">
                                            Garantías
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="arrendamiento"
                                        className="mt-4 space-y-4"
                                    >
                                        {/* Sub-tabs dentro de Arrendamiento */}
                                        <Tabs
                                            value={activeArrendamientoTab}
                                            onValueChange={(value) =>
                                                dispatch(
                                                    setActiveArrendamientoTab(
                                                        value as any,
                                                    ),
                                                )
                                            }
                                        >
                                            <TabsList className="mb-4 bg-secondary/10">
                                                <TabsTrigger value="datos-generales">
                                                    Datos Generales de la Línea
                                                </TabsTrigger>
                                                <TabsTrigger value="tipos-garantias">
                                                    Tipos de Garantías de la
                                                    Línea
                                                </TabsTrigger>
                                                <TabsTrigger value="avales">
                                                    Avales del la Línea
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent
                                                value="datos-generales"
                                                className="space-y-4"
                                            >
                                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                                    {/* Left Column - Línea and Bienes */}
                                                    <div className="space-y-6 lg:col-span-3">
                                                        {/* Datos Generales de la Línea */}
                                                        <DatosGeneralesLinea />

                                                        {/* Bienes Component */}
                                                        <Bienes />
                                                    </div>

                                                    {/* Center Column - Credit Conditions */}
                                                    <div className="space-y-4 rounded-lg border p-4 lg:col-span-5">
                                                        <h4 className="border-b pb-2 text-sm font-semibold text-primary">
                                                            Tipo de Garantías de
                                                            la Línea | Avales
                                                            del |
                                                        </h4>

                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div>
                                                                <Label className="text-xs">
                                                                    Número
                                                                    Cotización:
                                                                </Label>
                                                                <Input
                                                                    disabled
                                                                    className="h-8"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs">
                                                                    Ejecutivo:
                                                                </Label>
                                                                <Select
                                                                    defaultValue="mayte"
                                                                    disabled
                                                                >
                                                                    <SelectTrigger className="h-8">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="mayte">
                                                                            MAYTE
                                                                            MARTINEZ
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs">
                                                                    Fecha
                                                                    Captura:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    defaultValue="2025-10-30"
                                                                    className="h-8"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3 rounded-lg border p-3">
                                                            <h5 className="text-xs font-semibold text-primary">
                                                                Solicitud de
                                                                Crédito
                                                            </h5>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs">
                                                                    Condiciones
                                                                    Sol. Crédito
                                                                </Label>
                                                                <Select>
                                                                    <SelectTrigger className="h-8 w-full">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="pendiente">
                                                                            Pendiente
                                                                        </SelectItem>
                                                                        <SelectItem value="aprobado">
                                                                            Aprobado
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs">
                                                                    Desc. por
                                                                    Nomina
                                                                </Label>
                                                                <Select>
                                                                    <SelectTrigger className="h-8 w-full">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="si">
                                                                            28
                                                                            02
                                                                            2025
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            FISCALIA
                                                                            GENERAL
                                                                            DE
                                                                            JUSTICIA
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            PJENL
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            DE
                                                                            ACERO
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            JAVER
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            QUALTIA
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            SERVICIOS
                                                                            DE
                                                                            HERSMEX
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            LABORATORIOS
                                                                            GRIFFITH
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            GONHERMEX
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            CEMEX
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            VIAKABLE
                                                                        </SelectItem>
                                                                        <SelectItem value="no">
                                                                            DAL-TILE
                                                                            MEXICO
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3 rounded-lg border p-3">
                                                            <h5 className="text-xs font-semibold text-primary">
                                                                Criterios
                                                            </h5>
                                                            <div>
                                                                <Label className="text-xs">
                                                                    Amortización
                                                                    Lineal:
                                                                </Label>
                                                                <Checkbox
                                                                    id="amortizacion-lineal"
                                                                    className="ml-2"
                                                                    checked={
                                                                        criterios.amortizacionLineal
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        dispatch(
                                                                            updateCriterios(
                                                                                {
                                                                                    amortizacionLineal:
                                                                                        checked as boolean,
                                                                                },
                                                                            ),
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Periodo
                                                                        Pago:
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            criterios.periodoPago
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        periodoPago:
                                                                                            value as any,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="h-8">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="mensual">
                                                                                MENSUAL
                                                                            </SelectItem>
                                                                            <SelectItem value="bimestral">
                                                                                BIMESTRAL
                                                                            </SelectItem>
                                                                            <SelectItem value="trimestral">
                                                                                TRIMESTRAL
                                                                            </SelectItem>
                                                                            <SelectItem value="semestral">
                                                                                SEMESTRAL
                                                                            </SelectItem>
                                                                            <SelectItem value="anual">
                                                                                ANUAL
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Rentas
                                                                        en Dep.:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            criterios.rentasEnDeposito
                                                                        }
                                                                        onValueChange={(
                                                                            values,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        rentasEnDeposito:
                                                                                            values.floatValue ||
                                                                                            0,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Número
                                                                        Rentas:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            criterios.numeroRentas
                                                                        }
                                                                        onValueChange={(
                                                                            values,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        numeroRentas:
                                                                                            values.floatValue ||
                                                                                            0,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Periodo
                                                                        Gracia:
                                                                    </Label>
                                                                    <Input
                                                                        value={
                                                                            criterios.periodoGracia
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        periodoGracia:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Tipo
                                                                        Tasa:
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            criterios.tipoTasa
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        tipoTasa:
                                                                                            value as any,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="h-8">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="fija">
                                                                                TASA
                                                                                FIJA
                                                                            </SelectItem>
                                                                            <SelectItem value="variable">
                                                                                TASA
                                                                                VARIABLE
                                                                            </SelectItem>
                                                                            <SelectItem value="renta">
                                                                                RENTA
                                                                                FIJA
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Seg.
                                                                        Contratado
                                                                        Por:
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            criterios.seguroContratadoPor
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        seguroContratadoPor:
                                                                                            value,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        disabled
                                                                    >
                                                                        <SelectTrigger className="h-8">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="value">
                                                                                VALUE
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Tasa
                                                                        Base:
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            criterios.tasaBase
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        tasaBase:
                                                                                            value as any,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="h-8">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="tiie">
                                                                                TIIE
                                                                            </SelectItem>
                                                                            <SelectItem value="cetes">
                                                                                CETES
                                                                            </SelectItem>
                                                                            <SelectItem value="cpp">
                                                                                CPP
                                                                            </SelectItem>
                                                                            <SelectItem value="tiie-prom">
                                                                                TIIE
                                                                                Prom.
                                                                            </SelectItem>
                                                                            <SelectItem value="tiief-cxa">
                                                                                TIIEF
                                                                                CxA
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Opción
                                                                        Seguro:
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            criterios.opcionSeguro
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        opcionSeguro:
                                                                                            value as any,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="h-8">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="financiado">
                                                                                FINANCIADO
                                                                            </SelectItem>
                                                                            <SelectItem value="contado">
                                                                                CONTADO
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Tasa:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            criterios.tasa
                                                                        }
                                                                        onValueChange={(
                                                                            values,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        tasa:
                                                                                            values.floatValue ||
                                                                                            0,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        decimalScale={
                                                                            4
                                                                        }
                                                                        disabled
                                                                        className="h-8"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Total:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            0.0
                                                                        }
                                                                        decimalScale={
                                                                            2
                                                                        }
                                                                        disabled
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Sobretasa:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            criterios.sobretasa
                                                                        }
                                                                        onValueChange={(
                                                                            values,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        sobretasa:
                                                                                            values.floatValue ||
                                                                                            0,
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        decimalScale={
                                                                            4
                                                                        }
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs">
                                                                        Monto:
                                                                    </Label>
                                                                    <NumberInput
                                                                        value={
                                                                            0.0
                                                                        }
                                                                        decimalScale={
                                                                            2
                                                                        }
                                                                        disabled
                                                                        className="h-8"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Tasa Tope */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        id="tasa-tope"
                                                                        checked={
                                                                            tasaTopeEnabled
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            dispatch(
                                                                                setTasaTopeEnabled(
                                                                                    checked as boolean,
                                                                                ),
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label
                                                                        htmlFor="tasa-tope"
                                                                        className="cursor-pointer text-xs"
                                                                    >
                                                                        Tasa
                                                                        Tope:
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Select
                                                                        value={
                                                                            criterios
                                                                                .tasaTope
                                                                                .tipo
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        tasaTope:
                                                                                            {
                                                                                                ...criterios.tasaTope,
                                                                                                tipo: value as any,
                                                                                            },
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            !tasaTopeEnabled
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="h-8 flex-1">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="cap">
                                                                                Cap
                                                                            </SelectItem>
                                                                            <SelectItem value="no">
                                                                                No
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <NumberInput
                                                                        value={
                                                                            criterios
                                                                                .tasaTope
                                                                                .valor
                                                                        }
                                                                        onValueChange={(
                                                                            values,
                                                                        ) =>
                                                                            dispatch(
                                                                                updateCriterios(
                                                                                    {
                                                                                        tasaTope:
                                                                                            {
                                                                                                ...criterios.tasaTope,
                                                                                                valor:
                                                                                                    values.floatValue ||
                                                                                                    0,
                                                                                            },
                                                                                    },
                                                                                ),
                                                                            )
                                                                        }
                                                                        decimalScale={
                                                                            2
                                                                        }
                                                                        disabled={
                                                                            !tasaTopeEnabled
                                                                        }
                                                                        className="h-8 w-24"
                                                                    />
                                                                </div>
                                                                <p className="text-xs text-muted-foreground italic">
                                                                    *Tasa Tope
                                                                    sujeta a
                                                                    disponibilidad.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Pago Inicial */}
                                                        <PagoInicial />
                                                    </div>

                                                    {/* Right Column - Financial Details */}
                                                    <div className="lg:col-span-4">
                                                        <FinancialDetails />
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="tipos-garantias">
                                                <div className="py-8 text-center text-muted-foreground">
                                                    Tipos de Garantías de la
                                                    Línea
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="avales">
                                                <div className="py-8 text-center text-muted-foreground">
                                                    Avales del
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </TabsContent>

                                    <TabsContent value="tabla">
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse text-sm">
                                                <thead>
                                                    <tr className="bg-muted">
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Amortiza.
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Fecha Venc.
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Saldo Inicial
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Capital
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Rentas Deposito
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Pago Intermedio
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Enganche
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Capital Total
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Iva Capital Total
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Interes
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Iva Interes
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Auto Sustituto
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Seguro
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Total A Pagar
                                                        </th>
                                                        <th className="border border-border p-2 text-left font-semibold">
                                                            Saldo Final
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            colSpan={15}
                                                            className="border border-border p-4 text-center text-muted-foreground"
                                                        >
                                                            No hay datos para
                                                            mostrar
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="garantias">
                                        <div className="py-8 text-center text-muted-foreground">
                                            Garantías
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Bottom Action Buttons */}
                            <div className="flex justify-center gap-4 border-t pt-6">
                                <Button variant="outline">Nuevo</Button>
                                <Button variant="outline">
                                    Imposición Preliminar
                                </Button>
                                <Button variant="outline">
                                    Enviar a Créditos
                                </Button>
                                <Button variant="outline">Desglozar</Button>
                                <Button variant="outline">
                                    Calcular Cotización
                                </Button>
                                <Button variant="outline">Cancelar</Button>
                                <Button variant="outline">
                                    Solicitar Línea de Crédito
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lineas">
                    <Card>
                        <CardContent className="p-6">
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de Líneas
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="operaciones">
                    <Card>
                        <CardContent className="p-6">
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de Operaciones
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cotizaciones">
                    <Card>
                        <CardContent className="p-6">
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de Cotizaciones
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
