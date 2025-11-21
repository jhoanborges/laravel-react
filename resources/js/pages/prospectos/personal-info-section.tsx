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
import { usePersonalInfo, usePersonType } from '@/hooks/useProspectos';

export function PersonalInfoSection() {
    const { personType, setPersonType } = usePersonType();
    const { personalInfo, updatePersonalInfo } = usePersonalInfo();

    return (
        <div className="space-y-4 rounded-lg bg-secondary/10 p-4">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Tipo de Persona
                    </Label>
                    <Select
                        value={personType}
                        onValueChange={(value) =>
                            setPersonType(value as 'moral' | 'fisica')
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="MORAL" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="moral">MORAL</SelectItem>
                            <SelectItem value="fisica">FISICA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Personalidad
                        Fiscal
                    </Label>
                    <Select
                        value={personalInfo.fiscalPersonality}
                        onValueChange={(value) =>
                            updatePersonalInfo({ fiscalPersonality: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Persona Moral (Credito al Comercio)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="persona-moral">
                                Persona Moral (Credito al Comercio)
                            </SelectItem>
                            <SelectItem value="persona-fisica">
                                Persona Fisica
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Tipo de Riesgo
                    </Label>
                    <Select
                        value={personalInfo.riskType}
                        onValueChange={(value) =>
                            updatePersonalInfo({ riskType: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="BAJO" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bajo">BAJO</SelectItem>
                            <SelectItem value="medio">MEDIO</SelectItem>
                            <SelectItem value="alto">ALTO</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> RFC
                    </Label>
                    <Input
                        value={personalInfo.rfc}
                        onChange={(e) =>
                            updatePersonalInfo({ rfc: e.target.value })
                        }
                    />
                </div>

                <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                        id="rfcValidated"
                        checked={personalInfo.rfcValidated}
                        onCheckedChange={(checked) =>
                            updatePersonalInfo({
                                rfcValidated: checked as boolean,
                            })
                        }
                    />
                    <Label
                        htmlFor="rfcValidated"
                        className="cursor-pointer text-xs font-normal"
                    >
                        RFC Validado
                    </Label>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Actividad</Label>
                    <Input
                        value={personalInfo.activity}
                        onChange={(e) =>
                            updatePersonalInfo({ activity: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Medio Origen
                    </Label>
                    <Select
                        value={personalInfo.origin}
                        onValueChange={(value) =>
                            updatePersonalInfo({ origin: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Oficinas Value Al" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="oficinas-value-arrendadora">
                                Oficinas Value Arrendadora
                            </SelectItem>
                            <SelectItem value="elnorte-com">
                                ElNorte.com
                            </SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="webpage">Webpage</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="no-definido">
                                NO DEFINIDO
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        <span className="text-red-500">*</span> Políticamente
                        Expuesto
                    </Label>
                    <Select
                        value={personalInfo.politicallyExposed}
                        onValueChange={(value) =>
                            updatePersonalInfo({ politicallyExposed: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nacional">Nacional</SelectItem>
                            <SelectItem value="extranjero">
                                Extranjero
                            </SelectItem>
                            <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
