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
import { useAddressData } from '@/hooks/useProspectos';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function AddressSection() {
    const {
        fiscal,
        correspondencia,
        updateFiscal,
        updateCorrespondencia,
        copyFiscalToCorrespondencia,
    } = useAddressData();
    const [copied, setCopied] = useState(false);

    const copiarDireccion = () => {
        copyFiscalToCorrespondencia();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Fiscal Address */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">
                        Dirección Fiscal
                    </h3>
                    <Button
                        onClick={copiarDireccion}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 text-green-600" />
                                Copiado
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Copiar a Correspondencia
                            </>
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <Label htmlFor="fiscal-domicilio">
                            Domicilio <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="fiscal-domicilio"
                            value={fiscal.domicilio}
                            onChange={(e) =>
                                updateFiscal({ domicilio: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="fiscal-numExt">Nº Exterior</Label>
                        <Input
                            id="fiscal-numExt"
                            value={fiscal.numExterior}
                            onChange={(e) =>
                                updateFiscal({ numExterior: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="fiscal-cp">
                            Código Postal{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="fiscal-cp"
                            value={fiscal.codigoPostal}
                            onChange={(e) =>
                                updateFiscal({ codigoPostal: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="fiscal-numInt">Nº Interior</Label>
                        <Input
                            id="fiscal-numInt"
                            value={fiscal.numInterior}
                            onChange={(e) =>
                                updateFiscal({ numInterior: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="fiscal-colonia">
                            Colonia <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={fiscal.colonia}
                            onValueChange={(v) => updateFiscal({ colonia: v })}
                        >
                            <SelectTrigger id="fiscal-colonia">
                                <SelectValue placeholder="Seleccionar colonia" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="col1">Colonia 1</SelectItem>
                                <SelectItem value="col2">Colonia 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="fiscal-pais">
                            País <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={fiscal.pais}
                            onValueChange={(v) => updateFiscal({ pais: v })}
                        >
                            <SelectTrigger id="fiscal-pais">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MX">México</SelectItem>
                                <SelectItem value="US">
                                    Estados Unidos
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="fiscal-estado">
                            Estado <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={fiscal.estado}
                            onValueChange={(v) => updateFiscal({ estado: v })}
                        >
                            <SelectTrigger id="fiscal-estado">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NL">Nuevo León</SelectItem>
                                <SelectItem value="CDMX">
                                    Ciudad de México
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="fiscal-municipio">
                            Municipio <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={fiscal.municipio}
                            onValueChange={(v) =>
                                updateFiscal({ municipio: v })
                            }
                        >
                            <SelectTrigger id="fiscal-municipio">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mty">Monterrey</SelectItem>
                                <SelectItem value="spe">San Pedro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="fiscal-ciudad">
                            Ciudad <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={fiscal.ciudad}
                            onValueChange={(v) => updateFiscal({ ciudad: v })}
                        >
                            <SelectTrigger id="fiscal-ciudad">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mty">Monterrey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                            id="fiscal-colonia-no-encontrada"
                            checked={fiscal.coloniaNoEncontrada}
                            onCheckedChange={(checked) =>
                                updateFiscal({
                                    coloniaNoEncontrada: checked as boolean,
                                })
                            }
                        />
                        <Label
                            htmlFor="fiscal-colonia-no-encontrada"
                            className="cursor-pointer font-normal"
                        >
                            Colonia No Encontrada
                        </Label>
                    </div>
                    <div>
                        <Label htmlFor="fiscal-entre-calles">
                            Entre Calles
                        </Label>
                        <Input
                            id="fiscal-entre-calles"
                            value={fiscal.entreCalles}
                            onChange={(e) =>
                                updateFiscal({ entreCalles: e.target.value })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="border-t" />

            {/* Correspondence Address */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold">
                    Envío de Correspondencia
                </h3>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <Label htmlFor="corresp-domicilio">Domicilio</Label>
                        <Input
                            id="corresp-domicilio"
                            value={correspondencia.domicilio}
                            onChange={(e) =>
                                updateCorrespondencia({
                                    domicilio: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="corresp-numExt">Nº Exterior</Label>
                        <Input
                            id="corresp-numExt"
                            value={correspondencia.numExterior}
                            onChange={(e) =>
                                updateCorrespondencia({
                                    numExterior: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="corresp-cp">Código Postal</Label>
                        <Input
                            id="corresp-cp"
                            value={correspondencia.codigoPostal}
                            onChange={(e) =>
                                updateCorrespondencia({
                                    codigoPostal: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="corresp-numInt">Nº Interior</Label>
                        <Input
                            id="corresp-numInt"
                            value={correspondencia.numInterior}
                            onChange={(e) =>
                                updateCorrespondencia({
                                    numInterior: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="corresp-colonia">Colonia</Label>
                        <Select
                            value={correspondencia.colonia}
                            onValueChange={(v) =>
                                updateCorrespondencia({ colonia: v })
                            }
                        >
                            <SelectTrigger id="corresp-colonia">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="<NINGUNA>">
                                    {'<NINGUNA>'}
                                </SelectItem>
                                <SelectItem value="col1">Colonia 1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="corresp-pais">País</Label>
                        <Select
                            value={correspondencia.pais}
                            onValueChange={(v) =>
                                updateCorrespondencia({ pais: v })
                            }
                        >
                            <SelectTrigger id="corresp-pais">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="<NINGUNA>">
                                    {'<NINGUNA>'}
                                </SelectItem>
                                <SelectItem value="MX">México</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="corresp-estado">Estado</Label>
                        <Select
                            value={correspondencia.estado}
                            onValueChange={(v) =>
                                updateCorrespondencia({ estado: v })
                            }
                        >
                            <SelectTrigger id="corresp-estado">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="<NINGUNO>">
                                    {'<NINGUNO>'}
                                </SelectItem>
                                <SelectItem value="NL">Nuevo León</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="corresp-municipio">Municipio</Label>
                        <Select
                            value={correspondencia.municipio}
                            onValueChange={(v) =>
                                updateCorrespondencia({ municipio: v })
                            }
                        >
                            <SelectTrigger id="corresp-municipio">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="<NINGUNO>">
                                    {'<NINGUNO>'}
                                </SelectItem>
                                <SelectItem value="mty">Monterrey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="corresp-ciudad">Ciudad</Label>
                        <Select
                            value={correspondencia.ciudad}
                            onValueChange={(v) =>
                                updateCorrespondencia({ ciudad: v })
                            }
                        >
                            <SelectTrigger id="corresp-ciudad">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="<NINGUNA>">
                                    {'<NINGUNA>'}
                                </SelectItem>
                                <SelectItem value="mty">Monterrey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                            id="corresp-colonia-no-encontrada"
                            checked={correspondencia.coloniaNoEncontrada}
                            onCheckedChange={(checked) =>
                                updateCorrespondencia({
                                    coloniaNoEncontrada: checked as boolean,
                                })
                            }
                        />
                        <Label
                            htmlFor="corresp-colonia-no-encontrada"
                            className="cursor-pointer font-normal"
                        >
                            Colonia No Encontrada
                        </Label>
                    </div>
                    <div>
                        <Label htmlFor="corresp-entre-calles">
                            Entre Calles
                        </Label>
                        <Input
                            id="corresp-entre-calles"
                            value={correspondencia.entreCalles}
                            onChange={(e) =>
                                updateCorrespondencia({
                                    entreCalles: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
