'use client';

import { Button } from '@/components/ui/button';
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
import { useFisicaData } from '@/hooks/useProspectos';
import { NumberInput } from '@/lib/number-format';

export function FisicaSection() {
    const { fisica, updateFisica } = useFisicaData();

    return (
        <div className="space-y-4 rounded-lg bg-secondary/10 p-4">
            <h3 className="border-b pb-2 font-semibold text-primary">Fisica</h3>

            {/* First Row - Nombre, Estado Civil */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Nombre:
                    </Label>
                    <Input
                        value={fisica.nombre}
                        onChange={(e) =>
                            updateFisica({ nombre: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Estado Civil:
                    </Label>
                    <Select
                        value={fisica.estadoCivil}
                        onValueChange={(value) =>
                            updateFisica({ estadoCivil: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="casado-bienes-mancomunados">
                                CASADO BIENES MANCOMUNADOS
                            </SelectItem>
                            <SelectItem value="casado-bienes-separados">
                                CASADO BIENES SEPARADOS
                            </SelectItem>
                            <SelectItem value="divorciado">
                                DIVORCIADO
                            </SelectItem>
                            <SelectItem value="soltero">SOLTERO</SelectItem>
                            <SelectItem value="viudo">VIUDO</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Second Row - Ap. Paterno, Dependientes */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Ap. Paterno:
                    </Label>
                    <Input
                        value={fisica.apPaterno}
                        onChange={(e) =>
                            updateFisica({ apPaterno: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Dependientes:
                    </Label>
                    <NumberInput
                        value={fisica.dependientes}
                        onChange={(e) =>
                            updateFisica({ dependientes: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Third Row - Ap. Materno, Sexo */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Ap. Materno:
                    </Label>
                    <Input
                        value={fisica.apMaterno}
                        onChange={(e) =>
                            updateFisica({ apMaterno: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Sexo:</Label>
                    <Select
                        value={fisica.sexo}
                        onValueChange={(value) => updateFisica({ sexo: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Fourth Row - Tipo Identificación, Número, Nacionalidad */}
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Tipo de Identificación:
                    </Label>
                    <Select
                        value={fisica.tipoIdentificacion}
                        onValueChange={(value) =>
                            updateFisica({ tipoIdentificacion: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credencial-elector">
                                CREDENCIAL ELECTOR
                            </SelectItem>
                            <SelectItem value="licencia-manejo">
                                LICENCIA DE MANEJO
                            </SelectItem>
                            <SelectItem value="pasaporte-vigente">
                                PASAPORTE VIGENTE
                            </SelectItem>
                            <SelectItem value="cartilla-militar">
                                CARTILLA MILITAR
                            </SelectItem>
                            <SelectItem value="tarjeta-consular">
                                TARJETA CONSULAR
                            </SelectItem>
                            <SelectItem value="cedula-profesional">
                                Cedula Profesional
                            </SelectItem>
                            <SelectItem value="forma-fm3">Forma FM3</SelectItem>
                            <SelectItem value="forma-fm2">Forma FM2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Número:</Label>
                    <Input
                        value={fisica.numeroIdentificacion}
                        onChange={(e) =>
                            updateFisica({
                                numeroIdentificacion: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Nacionalidad:
                    </Label>
                    <Select
                        value={fisica.nacionalidad}
                        onValueChange={(value) =>
                            updateFisica({ nacionalidad: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar nacionalidad..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mexicana">Mexicana</SelectItem>
                            <SelectItem value="estadounidense">
                                Estadounidense
                            </SelectItem>
                            <SelectItem value="canadiense">
                                Canadiense
                            </SelectItem>
                            <SelectItem value="otra">Otra</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Fifth Row - Fecha Nacimiento, Lugar */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Fecha de
                        Nacimiento:
                    </Label>
                    <Input
                        type="date"
                        value={fisica.fechaNacimiento}
                        onChange={(e) =>
                            updateFisica({ fechaNacimiento: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Lugar:</Label>
                    <Input
                        value={fisica.lugar}
                        onChange={(e) =>
                            updateFisica({ lugar: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Sixth Row - Requiere CURP and CURP Input */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="requiereCurp"
                        checked={fisica.requiereCurp}
                        onCheckedChange={(checked) =>
                            updateFisica({ requiereCurp: checked as boolean })
                        }
                    />
                    <Label
                        htmlFor="requiereCurp"
                        className="cursor-pointer text-sm font-semibold"
                    >
                        Requiere CURP:
                    </Label>
                </div>

                <Input
                    value={fisica.curp}
                    onChange={(e) => updateFisica({ curp: e.target.value })}
                    disabled={!fisica.requiereCurp}
                    placeholder="Ingrese CURP"
                    className={!fisica.requiereCurp ? 'bg-muted' : ''}
                />
            </div>

            {/* Seventh Row - Nombre Completo Fiscal with Validar button */}
            <div className="space-y-2">
                <Label className="text-sm font-semibold">
                    <span className="text-red-500">*</span> Nombre Completo
                    Fiscal:
                </Label>
                <div className="flex gap-2">
                    <Input
                        value={fisica.nombreCompletoFiscal}
                        onChange={(e) =>
                            updateFisica({
                                nombreCompletoFiscal: e.target.value,
                            })
                        }
                        className="flex-1"
                    />
                    <Button variant="outline" type="button">
                        Validar
                    </Button>
                </div>
            </div>
        </div>
    );
}
