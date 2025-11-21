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
import { CurrencyInput } from '@/lib/currency-format';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateLinea } from '@/redux/slices';

export default function DatosGeneralesLinea() {
    const dispatch = useAppDispatch();
    const lineaData = useAppSelector((state) => state.cotizador.form.linea);

    return (
        <div className="space-y-3 rounded-lg border bg-white p-4">
            <h4 className="border-b pb-2 text-sm font-semibold text-primary">
                Datos Generales de la Línea
            </h4>

            {/* Línea */}
            <div className="space-y-1">
                <Label className="text-xs">Línea:</Label>
                <Select
                    value={lineaData.linea}
                    onValueChange={(value) =>
                        dispatch(updateLinea({ linea: value }))
                    }
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
                    onCheckedChange={(checked) =>
                        dispatch(
                            updateLinea({
                                usarLineaExistente: checked as boolean,
                            }),
                        )
                    }
                />
                <Label htmlFor="usar-linea" className="text-xs">
                    Usar Línea Existente
                </Label>
            </div>

            {/* Fechas */}
            <div className="space-y-2 border-t pt-3">
                <h5 className="text-xs font-semibold text-primary">Fechas</h5>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Alta:</Label>
                        <Input
                            type="date"
                            value={lineaData.fechas.alta}
                            onChange={(e) =>
                                dispatch(
                                    updateLinea({
                                        fechas: {
                                            ...lineaData.fechas,
                                            alta: e.target.value,
                                        },
                                    }),
                                )
                            }
                            className="h-8 w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Vigencia:</Label>
                        <Input
                            type="date"
                            value={lineaData.fechas.vigencia}
                            onChange={(e) =>
                                dispatch(
                                    updateLinea({
                                        fechas: {
                                            ...lineaData.fechas,
                                            vigencia: e.target.value,
                                        },
                                    }),
                                )
                            }
                            className="h-8 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Comisión por Apertura */}
            <div className="space-y-2 border-t pt-3">
                <h5 className="text-xs font-semibold text-primary">
                    Comisión por Apertura
                </h5>
                <div className="space-y-1">
                    <Label className="text-xs">Pctje.</Label>
                    <div className="flex items-center gap-2">
                        <CurrencyInput
                            value={lineaData.comisionApertura}
                            onValueChange={(values) =>
                                dispatch(
                                    updateLinea({
                                        comisionApertura:
                                            values.floatValue || 0,
                                    }),
                                )
                            }
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
                    onCheckedChange={(checked) =>
                        dispatch(
                            updateLinea({
                                requiereGarantias: checked as boolean,
                            }),
                        )
                    }
                />
                <Label htmlFor="requiere-garantias" className="text-xs">
                    Requiere Garantías
                </Label>
            </div>

            {/* Línea y Tipo Tasa - Layout en 2 columnas */}
            <div className="border-t pt-3">
                <h5 className="mb-2 text-xs font-semibold text-primary">
                    Línea
                </h5>
                <div className="grid grid-cols-2 gap-4">
                    {/* Columna izquierda - Línea */}
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Autorizada:</Label>
                            <CurrencyInput
                                value={lineaData.lineaAutorizada}
                                className="h-8 w-full bg-muted"
                                readOnly
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Dispuesto:</Label>
                            <CurrencyInput
                                value={lineaData.lineaDispuesto}
                                className="h-8 w-full bg-muted"
                                readOnly
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Disponible:</Label>
                            <CurrencyInput
                                value={lineaData.lineaDisponible}
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
                                onValueChange={(value) =>
                                    dispatch(updateLinea({ tipoTasa: value }))
                                }
                            >
                                <SelectTrigger className="h-8 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="variable">
                                        TASA VARIABLE
                                    </SelectItem>
                                    <SelectItem value="fija">
                                        TASA FIJA
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tasa Base */}
                        <div className="space-y-1">
                            <Label className="text-xs">Tasa Base</Label>
                            <Select
                                value={lineaData.tasaBase}
                                onValueChange={(value) =>
                                    dispatch(updateLinea({ tasaBase: value }))
                                }
                            >
                                <SelectTrigger className="h-8 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tiie">
                                        TIIE CxA
                                    </SelectItem>
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
                                onValueChange={(values) =>
                                    dispatch(
                                        updateLinea({
                                            tasaOrig: values.floatValue || 0,
                                        }),
                                    )
                                }
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
                                    onValueChange={(values) =>
                                        dispatch(
                                            updateLinea({
                                                sobretasa:
                                                    values.floatValue || 0,
                                            }),
                                        )
                                    }
                                    className="h-8 w-full"
                                    decimalScale={4}
                                />
                                <span className="text-xs whitespace-nowrap">
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
