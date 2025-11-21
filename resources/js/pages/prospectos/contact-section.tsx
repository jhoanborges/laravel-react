'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useContactData, usePersonType } from '@/hooks/useProspectos';

export function ContactSection() {
    const { personType } = usePersonType();
    const { contact, updateContact } = useContactData();

    return (
        <div className="space-y-4 rounded-lg bg-secondary/10 p-4">
            <h3 className="border-b pb-2 font-semibold text-primary">
                Información de Contacto
            </h3>

            {/* Electronic Signature */}
            <div className="flex items-center gap-2">
                <Checkbox
                    id="signature"
                    checked={contact.requiresElectronicSignature}
                    onCheckedChange={(checked) =>
                        updateContact({
                            requiresElectronicSignature: checked as boolean,
                        })
                    }
                />
                <Label
                    htmlFor="signature"
                    className="cursor-pointer text-sm font-semibold"
                >
                    Requiere Firma Electrónica
                </Label>
            </div>

            {/* Email Fields and Fisica-specific fields in 2 columns */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Correo
                        Electrónico
                    </Label>
                    <Input
                        type="email"
                        value={contact.email}
                        onChange={(e) =>
                            updateContact({ email: e.target.value })
                        }
                        placeholder="correo@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Correo E. Factura
                    </Label>
                    <Input
                        type="email"
                        value={contact.invoiceEmail}
                        onChange={(e) =>
                            updateContact({ invoiceEmail: e.target.value })
                        }
                        placeholder="factura@example.com"
                    />
                </div>

                {/* Fisica-specific fields - País and Entidad Federativa */}
                {personType === 'fisica' && (
                    <>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                                <span className="text-red-500">*</span> País de
                                Nacimiento:
                            </Label>
                            <Select
                                value={contact.paisNacimiento}
                                onValueChange={(value) =>
                                    updateContact({ paisNacimiento: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar país..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mexico">
                                        México
                                    </SelectItem>
                                    <SelectItem value="estados-unidos">
                                        Estados Unidos
                                    </SelectItem>
                                    <SelectItem value="canada">
                                        Canadá
                                    </SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                                <span className="text-red-500">*</span> Entidad
                                Federativa de Nacimiento:
                            </Label>
                            <Select
                                value={contact.entidadFederativaNacimiento}
                                onValueChange={(value) =>
                                    updateContact({
                                        entidadFederativaNacimiento: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar entidad..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aguascalientes">
                                        Aguascalientes
                                    </SelectItem>
                                    <SelectItem value="baja-california">
                                        Baja California
                                    </SelectItem>
                                    <SelectItem value="baja-california-sur">
                                        Baja California Sur
                                    </SelectItem>
                                    <SelectItem value="campeche">
                                        Campeche
                                    </SelectItem>
                                    <SelectItem value="chiapas">
                                        Chiapas
                                    </SelectItem>
                                    <SelectItem value="chihuahua">
                                        Chihuahua
                                    </SelectItem>
                                    <SelectItem value="coahuila">
                                        Coahuila
                                    </SelectItem>
                                    <SelectItem value="colima">
                                        Colima
                                    </SelectItem>
                                    <SelectItem value="cdmx">
                                        Ciudad de México
                                    </SelectItem>
                                    <SelectItem value="durango">
                                        Durango
                                    </SelectItem>
                                    <SelectItem value="guanajuato">
                                        Guanajuato
                                    </SelectItem>
                                    <SelectItem value="guerrero">
                                        Guerrero
                                    </SelectItem>
                                    <SelectItem value="hidalgo">
                                        Hidalgo
                                    </SelectItem>
                                    <SelectItem value="jalisco">
                                        Jalisco
                                    </SelectItem>
                                    <SelectItem value="mexico">
                                        Estado de México
                                    </SelectItem>
                                    <SelectItem value="michoacan">
                                        Michoacán
                                    </SelectItem>
                                    <SelectItem value="morelos">
                                        Morelos
                                    </SelectItem>
                                    <SelectItem value="nayarit">
                                        Nayarit
                                    </SelectItem>
                                    <SelectItem value="nuevo-leon">
                                        Nuevo León
                                    </SelectItem>
                                    <SelectItem value="oaxaca">
                                        Oaxaca
                                    </SelectItem>
                                    <SelectItem value="puebla">
                                        Puebla
                                    </SelectItem>
                                    <SelectItem value="queretaro">
                                        Querétaro
                                    </SelectItem>
                                    <SelectItem value="quintana-roo">
                                        Quintana Roo
                                    </SelectItem>
                                    <SelectItem value="san-luis-potosi">
                                        San Luis Potosí
                                    </SelectItem>
                                    <SelectItem value="sinaloa">
                                        Sinaloa
                                    </SelectItem>
                                    <SelectItem value="sonora">
                                        Sonora
                                    </SelectItem>
                                    <SelectItem value="tabasco">
                                        Tabasco
                                    </SelectItem>
                                    <SelectItem value="tamaulipas">
                                        Tamaulipas
                                    </SelectItem>
                                    <SelectItem value="tlaxcala">
                                        Tlaxcala
                                    </SelectItem>
                                    <SelectItem value="veracruz">
                                        Veracruz
                                    </SelectItem>
                                    <SelectItem value="yucatan">
                                        Yucatán
                                    </SelectItem>
                                    <SelectItem value="zacatecas">
                                        Zacatecas
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}
            </div>

            {/* Phone Fields */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary">
                    Teléfonos
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                            <span className="text-red-500">*</span> Teléfono 1
                        </Label>
                        <div className="flex gap-2">
                            <Select
                                value={contact.phone1Type}
                                onValueChange={(value) =>
                                    updateContact({ phone1Type: value })
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="OFICINA" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oficina">
                                        OFICINA
                                    </SelectItem>
                                    <SelectItem value="casa">CASA</SelectItem>
                                    <SelectItem value="fax">FAX</SelectItem>
                                    <SelectItem value="celular">
                                        CELULAR
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={contact.phone1}
                                onChange={(e) =>
                                    updateContact({ phone1: e.target.value })
                                }
                                placeholder="Número"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                            Teléfono 3
                        </Label>
                        <div className="flex gap-2">
                            <Select
                                value={contact.phone3Type}
                                onValueChange={(value) =>
                                    updateContact({ phone3Type: value })
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="FAX" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oficina">
                                        OFICINA
                                    </SelectItem>
                                    <SelectItem value="casa">CASA</SelectItem>
                                    <SelectItem value="fax">FAX</SelectItem>
                                    <SelectItem value="celular">
                                        CELULAR
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={contact.phone3}
                                onChange={(e) =>
                                    updateContact({ phone3: e.target.value })
                                }
                                placeholder="Número"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                            Teléfono 2
                        </Label>
                        <div className="flex gap-2">
                            <Select
                                value={contact.phone2Type}
                                onValueChange={(value) =>
                                    updateContact({ phone2Type: value })
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="CASA" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oficina">
                                        OFICINA
                                    </SelectItem>
                                    <SelectItem value="casa">CASA</SelectItem>
                                    <SelectItem value="fax">FAX</SelectItem>
                                    <SelectItem value="celular">
                                        CELULAR
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={contact.phone2}
                                onChange={(e) =>
                                    updateContact({ phone2: e.target.value })
                                }
                                placeholder="Número"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                            Teléfono 4
                        </Label>
                        <div className="flex gap-2">
                            <Select
                                value={contact.phone4Type}
                                onValueChange={(value) =>
                                    updateContact({ phone4Type: value })
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="CELULAR" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oficina">
                                        OFICINA
                                    </SelectItem>
                                    <SelectItem value="casa">CASA</SelectItem>
                                    <SelectItem value="fax">FAX</SelectItem>
                                    <SelectItem value="celular">
                                        CELULAR
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={contact.phone4}
                                onChange={(e) =>
                                    updateContact({ phone4: e.target.value })
                                }
                                placeholder="Número"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
