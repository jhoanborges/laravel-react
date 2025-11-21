'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CurrencyInput } from '@/lib/currency-format';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateBienes, updateBienesTotales } from '@/redux/slices';
import { useMemo } from 'react';

export default function Bienes() {
    const dispatch = useAppDispatch();
    const bienesData = useAppSelector((state) => state.cotizador.form.bienes);

    // Helper to parse numbers
    const parseNumber = (value: number | string): number => {
        if (typeof value === 'number') return value;
        const parsed = parseFloat(String(value).replace(/,/g, ''));
        return isNaN(parsed) ? 0 : parsed;
    };

    // Calculate IVA for bien
    const calculateBienIva = useMemo(() => {
        return (
            parseNumber(bienesData.totales.bien.total) -
            parseNumber(bienesData.totales.bien.monto)
        );
    }, [bienesData.totales.bien.total, bienesData.totales.bien.monto]);

    // Calculate accesorios total
    const calculateAccesoriosTotal = useMemo(() => {
        return (
            parseNumber(bienesData.totales.accesorios.monto) +
            parseNumber(bienesData.totales.accesorios.iva)
        );
    }, [
        bienesData.totales.accesorios.monto,
        bienesData.totales.accesorios.iva,
    ]);

    // Calculate grand total (monto)
    const calculateTotalMonto = useMemo(() => {
        return (
            parseNumber(bienesData.totales.bien.monto) +
            parseNumber(bienesData.totales.accesorios.monto)
        );
    }, [bienesData.totales.bien.monto, bienesData.totales.accesorios.monto]);

    // Calculate grand total (iva)
    const calculateTotalIva = useMemo(() => {
        return (
            calculateBienIva + parseNumber(bienesData.totales.accesorios.iva)
        );
    }, [calculateBienIva, bienesData.totales.accesorios.iva]);

    // Calculate grand total
    const calculateGrandTotal = useMemo(() => {
        return (
            parseNumber(bienesData.totales.bien.total) +
            calculateAccesoriosTotal
        );
    }, [bienesData.totales.bien.total, calculateAccesoriosTotal]);

    return (
        <div className="space-y-3 rounded-lg border p-4">
            <h4 className="border-b pb-2 text-sm font-semibold text-primary">
                Bienes
            </h4>
            <div className="grid grid-cols-2 items-end gap-2">
                <div className="space-y-2">
                    <Label className="text-xs">Grupo:</Label>
                    <Select
                        value={bienesData.grupo}
                        onValueChange={(value) =>
                            dispatch(updateBienes({ grupo: value }))
                        }
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="muebles">Muebles</SelectItem>
                            <SelectItem value="inmuebles">Inmuebles</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs">Tipo:</Label>
                    <Select
                        value={bienesData.tipo}
                        onValueChange={(value) =>
                            dispatch(updateBienes({ tipo: value }))
                        }
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="transporte">
                                Equipo de Transporte
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 items-end gap-2">
                <div className="space-y-2">
                    <Label className="text-xs">Marca:</Label>
                    <Select
                        value={bienesData.marca}
                        onValueChange={(value) =>
                            dispatch(updateBienes({ marca: value }))
                        }
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="acura">ACURA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs">Modelo:</Label>
                    <Select
                        value={bienesData.modelo}
                        onValueChange={(value) =>
                            dispatch(updateBienes({ modelo: value }))
                        }
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rdx">RDX</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 items-end gap-2">
                <div>
                    <Label className="text-xs">Año:</Label>
                    <Select
                        value={bienesData.ano}
                        onValueChange={(value) =>
                            dispatch(updateBienes({ ano: value }))
                        }
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex h-8 items-center justify-center space-x-2">
                    <Checkbox
                        id="bien-nuevo"
                        checked={bienesData.bienNuevo}
                        onCheckedChange={(checked) =>
                            dispatch(
                                updateBienes({ bienNuevo: checked as boolean }),
                            )
                        }
                    />
                    <Label
                        htmlFor="bien-nuevo"
                        className="cursor-pointer text-xs"
                    >
                        Bien Nuevo
                    </Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs">Descripción:</Label>
                <textarea
                    className="w-full rounded-md border p-2 text-xs"
                    rows={2}
                    value={bienesData.descripcion}
                    onChange={(e) =>
                        dispatch(updateBienes({ descripcion: e.target.value }))
                    }
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs">Comentarios:</Label>
                <textarea
                    className="w-full rounded-md border p-2 text-xs"
                    rows={2}
                    value={bienesData.comentarios}
                    onChange={(e) =>
                        dispatch(updateBienes({ comentarios: e.target.value }))
                    }
                />
            </div>

            {/* Totals Table */}
            <div className="border-t pt-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="h-8 text-xs font-semibold"></TableHead>
                            <TableHead className="h-8 text-center text-xs font-semibold text-primary">
                                TOTAL
                            </TableHead>
                            <TableHead className="h-8 text-center text-xs font-semibold text-primary">
                                MONTO
                            </TableHead>
                            <TableHead className="h-8 text-center text-xs font-semibold text-primary">
                                I.V.A.
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-xs font-medium">
                                Bien:
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={bienesData.totales.bien.total}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updateBienesTotales({
                                                bien: {
                                                    ...bienesData.totales.bien,
                                                    total:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-7 text-right text-xs"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={bienesData.totales.bien.monto}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updateBienesTotales({
                                                bien: {
                                                    ...bienesData.totales.bien,
                                                    monto:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-7 text-right text-xs"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={calculateBienIva}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-xs font-medium">
                                Accesorios:
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={calculateAccesoriosTotal}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={bienesData.totales.accesorios.monto}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={bienesData.totales.accesorios.iva}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                            <TableCell className="text-xs font-semibold">
                                Total Bien+Acc:
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={calculateGrandTotal}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs font-semibold"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={calculateTotalMonto}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs font-semibold"
                                />
                            </TableCell>
                            <TableCell className="p-1">
                                <CurrencyInput
                                    value={calculateTotalIva}
                                    readOnly
                                    className="h-7 bg-muted text-right text-xs font-semibold"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
