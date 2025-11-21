'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CurrencyInput } from '@/lib/currency-format'

interface LineaData {
    linea: string
    usarLineaExistente: boolean
    fechas: {
        alta: string
        vigencia: string
    }
    comisionApertura: number
    requiereGarantias: boolean
    tipoTasa: string
    tasaBase: string
    tasaOrig: number
    sobretasa: number
    porcentaje: number
}

interface DatosGeneralesLineaProps {
    data?: Partial<LineaData>
    onChange?: (data: LineaData) => void
}

const defaultData: LineaData = {
    linea: '',
    usarLineaExistente: false,
    fechas: {
        alta: '2025-10-30',
        vigencia: '2025-10-30'
    },
    comisionApertura: 0,
    requiereGarantias: false,
    tipoTasa: 'variable',
    tasaBase: 'tiie',
    tasaOrig: 0,
    sobretasa: 0,
    porcentaje: 0
}

export default function DatosGeneralesLinea({ data = defaultData, onChange }: DatosGeneralesLineaProps) {
    const [lineaData, setLineaData] = useState<LineaData>({ ...defaultData, ...data })

    const handleChange = (field: string, value: any) => {
        const newData = { ...lineaData, [field]: value }
        setLineaData(newData)
        onChange?.(newData)
    }

    return (
        <div className="border rounded-lg p-4 space-y-3 bg-white">
            <h4 className="font-semibold text-sm text-primary border-b pb-2">Datos Generales de la Línea</h4>

            {/* Línea */}
            <div className="space-y-1">
                <Label className="text-xs">Línea:</Label>
                <Select
                    value={lineaData.linea}
                    onValueChange={(value) => handleChange('linea', value)}
                >
                    <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Línea 1</SelectItem>
                        <SelectItem value="2">Línea 2</SelectItem>
                        <SelectItem value="3">Línea 3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Usar Línea Existente */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="usar-linea"
                    checked={lineaData.usarLineaExistente}
                    onCheckedChange={(checked) => handleChange('usarLineaExistente', checked)}
                />
                <Label htmlFor="usar-linea" className="text-xs">Usar Línea Existente</Label>
            </div>

            {/* Fechas */}
            <div className="border-t pt-3 space-y-2">
                <h5 className="text-xs font-semibold text-primary">Fechas</h5>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Alta:</Label>
                        <Input
                            type="date"
                            value={lineaData.fechas.alta}
                            onChange={(e) => handleChange('fechas', { ...lineaData.fechas, alta: e.target.value })}
                            className="h-8 w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Vigencia:</Label>
                        <Input
                            type="date"
                            value={lineaData.fechas.vigencia}
                            onChange={(e) => handleChange('fechas', { ...lineaData.fechas, vigencia: e.target.value })}
                            className="h-8 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Comisión por Apertura */}
            <div className="border-t pt-3 space-y-2">
                <h5 className="text-xs font-semibold text-primary">Comisión por Apertura</h5>
                <div className="space-y-1">
                    <Label className="text-xs">Pctje.</Label>
                    <div className="flex items-center gap-2">
                        <CurrencyInput
                            value={lineaData.comisionApertura}
                            onValueChange={(values) => handleChange('comisionApertura', values.floatValue || 0)}
                            className="h-8 w-full"
                        />
                        <span className="text-xs whitespace-nowrap">%</span>
                    </div>
                </div>
            </div>



            {/* Requiere Garantías */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="requiere-garantias"
                    checked={lineaData.requiereGarantias}
                    onCheckedChange={(checked) => handleChange('requiereGarantias', checked)}
                />
                <Label htmlFor="requiere-garantias" className="text-xs">Requiere Garantías</Label>
            </div>

            {/* Línea y Tipo Tasa - Layout en 2 columnas */}
            <div className="border-t pt-3">
                <h5 className="text-xs font-semibold text-primary mb-2">Línea</h5>
                <div className="grid grid-cols-2 gap-4">
                    {/* Columna izquierda - Línea */}
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Autorizada:</Label>
                            <CurrencyInput
                                value={0}
                                className="h-8 w-full bg-muted"
                                readOnly
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Dispuesto:</Label>
                            <CurrencyInput
                                value={0}
                                className="h-8 w-full bg-muted"
                                readOnly
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Disponible:</Label>
                            <CurrencyInput
                                value={0}
                                className="h-8 w-full bg-muted"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Columna derecha - Tipo Tasa */}
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Tipo Tasa</Label>
                            <Select
                                value={lineaData.tipoTasa}
                                onValueChange={(value) => handleChange('tipoTasa', value)}
                            >
                                <SelectTrigger className="h-8 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="variable">TASA VARIABLE</SelectItem>
                                    <SelectItem value="fija">TASA FIJA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tasa Base */}
                        <div className="space-y-1">
                            <Label className="text-xs">Tasa Base</Label>
                            <Select
                                value={lineaData.tasaBase}
                                onValueChange={(value) => handleChange('tasaBase', value)}
                            >
                                <SelectTrigger className="h-8 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tiie">TIIE CxA</SelectItem>
                                    <SelectItem value="cetes">CETES</SelectItem>
                                    <SelectItem value="libor">LIBOR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tasa Orig. */}
                        <div className="space-y-1">
                            <Label className="text-xs">Tasa Orig.</Label>
                            <CurrencyInput
                                value={lineaData.tasaOrig}
                                onValueChange={(values) => handleChange('tasaOrig', values.floatValue || 0)}
                                className="h-8 w-full"
                                decimalScale={4}
                            />
                        </div>

                        {/* Sobretasa */}
                        <div className="space-y-1">
                            <Label className="text-xs">Sobretasa</Label>
                            <div className="flex items-center gap-2">
                                <CurrencyInput
                                    value={lineaData.sobretasa}
                                    onValueChange={(values) => handleChange('sobretasa', values.floatValue || 0)}
                                    className="h-8 w-full"
                                    decimalScale={4}
                                />
                                <span className="text-xs whitespace-nowrap">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
