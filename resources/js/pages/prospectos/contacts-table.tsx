'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContactsTable } from '@/hooks/useProspectos';
import { Trash2 } from 'lucide-react';

export function ContactsTable() {
    const { contacts, addContact, updateContact, deleteContact } =
        useContactsTable();

    return (
        <div className="space-y-4">
            <Button onClick={addContact} variant="default">
                Agregar Contacto
            </Button>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold">
                                Nº
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Contacto
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Puesto
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Teléfono
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Tipo
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Correo Electrónico
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr
                                key={contact.id}
                                className="border-b hover:bg-muted/50"
                            >
                                <td className="px-4 py-2 text-muted-foreground">
                                    {contact.numero}
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        value={contact.contacto}
                                        onChange={(e) =>
                                            updateContact(
                                                contact.id,
                                                'contacto',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Nombre"
                                        className="h-8"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        value={contact.puesto}
                                        onChange={(e) =>
                                            updateContact(
                                                contact.id,
                                                'puesto',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Puesto"
                                        className="h-8"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        value={contact.telefono}
                                        onChange={(e) =>
                                            updateContact(
                                                contact.id,
                                                'telefono',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Teléfono"
                                        className="h-8"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        value={contact.tipo}
                                        onChange={(e) =>
                                            updateContact(
                                                contact.id,
                                                'tipo',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Tipo"
                                        className="h-8"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        type="email"
                                        value={contact.correoElectronico}
                                        onChange={(e) =>
                                            updateContact(
                                                contact.id,
                                                'correoElectronico',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="correo@example.com"
                                        className="h-8"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Button
                                        onClick={() =>
                                            deleteContact(contact.id)
                                        }
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
