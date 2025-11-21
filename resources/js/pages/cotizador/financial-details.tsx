'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyInput } from '@/lib/currency-format';
import { NumberInput } from '@/lib/number-format';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    addPagoIntermedio,
    removePagoIntermedio,
    setAutoSustitutoEnabled,
    setSeguroCreditoEnabled,
    updateFinancialDetails,
    updatePagoIntermedio,
} from '@/redux/slices';

export default function FinancialDetails() {
    const dispatch = useAppDispatch();

    // Select state from Redux
    const financialData = useAppSelector(
        (state) => state.cotizador.form.financialDetails,
    );
    const pagosIntermedios = useAppSelector(
        (state) => state.cotizador.form.financialDetails.pagosIntermedios,
    );

    const handleAddPagoIntermedio = () => {
        const newPago = {
            id: Date.now().toString(),
            amortiza: '',
            total: 0,
            monto: 0,
            iva: 0,
            isValidated: false,
        };
        dispatch(addPagoIntermedio(newPago));
    };

    const handleRemovePagoIntermedio = (id: string) => {
        dispatch(removePagoIntermedio(id));
    };

    const handleUpdatePagoIntermedio = (
        id: string,
        field: string,
        value: string | number | boolean,
    ) => {
        dispatch(updatePagoIntermedio({ id, data: { [field]: value } as any }));
    };

    const handleValidatePagoIntermedio = async (id: string) => {
        // TODO: Replace with actual API call when endpoint is ready
        // Simulating API validation - hardcoded to always pass
        const isValid = await new Promise<boolean>((resolve) => {
            setTimeout(() => resolve(true), 500);
        });

        if (isValid) {
            handleUpdatePagoIntermedio(id, 'isValidated', true);
        }
    };

    return (
        <div className="space-y-4">
            {/* Row 1: Fecha Captura + Monto Financiado */}
            <div className="space-y-4">
                {/* Fecha Captura */}
                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Fecha Captura:</Label>
                    <Input
                        type="date"
                        value={financialData.fechaCaptura}
                        onChange={(e) =>
                            dispatch(
                                updateFinancialDetails({
                                    fechaCaptura: e.target.value,
                                }),
                            )
                        }
                        className="h-8"
                    />
                </div>

                {/* Monto Financiado */}
                <div className="space-y-3 rounded-lg border p-3">
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-sm font-semibold text-primary">
                            Monto Financiado
                        </Label>
                        <CurrencyInput
                            value={financialData.montoFinanciado}
                            className="h-8 font-bold"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-xs">Pago MENSUAL:</Label>
                        <CurrencyInput
                            value={financialData.pagoMensual}
                            className="h-8"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-xs">I.V.A.:</Label>
                        <CurrencyInput
                            value={financialData.iva}
                            className="h-8"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-xs">Auto Sustituto:</Label>
                        <CurrencyInput
                            value={financialData.autoSustituto}
                            className="h-8"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-xs">Seguro Crédito:</Label>
                        <CurrencyInput
                            value={financialData.seguroCredito}
                            className="h-8"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2 border-t pt-2">
                        <Label className="text-xs font-semibold">Total:</Label>
                        <Input className="h-8" readOnly />
                    </div>
                </div>
            </div>

            {/* Row 2: Opción Compra */}
            <div className="space-y-3 rounded-lg border p-3">
                <h5 className="text-sm font-semibold text-primary">
                    Opción Compra
                </h5>
                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Opción Compra:</Label>
                    <div className="flex items-center gap-2">
                        <NumberInput
                            value={financialData.opcionCompra.porcentaje}
                            onValueChange={(values) =>
                                dispatch(
                                    updateFinancialDetails({
                                        opcionCompra: {
                                            ...financialData.opcionCompra,
                                            porcentaje: values.floatValue || 0,
                                        },
                                    }),
                                )
                            }
                            decimalScale={2}
                            className="h-8 w-20"
                        />
                        <span className="text-xs">%</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <div></div>
                    <CurrencyInput
                        value={financialData.opcionCompra.monto}
                        onValueChange={(values) =>
                            dispatch(
                                updateFinancialDetails({
                                    opcionCompra: {
                                        ...financialData.opcionCompra,
                                        monto: values.floatValue || 0,
                                    },
                                }),
                            )
                        }
                        className="h-8"
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Monto:</Label>
                    <CurrencyInput
                        value={financialData.opcionCompra.montoBase}
                        className="h-8"
                        readOnly
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">I.V.A.:</Label>
                    <CurrencyInput
                        value={financialData.opcionCompra.iva}
                        className="h-8"
                        readOnly
                    />
                </div>
            </div>

            {/* Row 3: Gastos Financiados */}
            <div className="space-y-3 rounded-lg border p-3">
                <h5 className="text-sm font-semibold text-primary">
                    Gastos Financiados:
                </h5>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Monto:</Label>
                    <CurrencyInput
                        value={financialData.gastosFinanciados.monto}
                        onValueChange={(values) =>
                            dispatch(
                                updateFinancialDetails({
                                    gastosFinanciados: {
                                        ...financialData.gastosFinanciados,
                                        monto: values.floatValue || 0,
                                    },
                                }),
                            )
                        }
                        className="h-8"
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">I.V.A.:</Label>
                    <CurrencyInput
                        value={financialData.gastosFinanciados.iva}
                        className="h-8"
                        disabled
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Monto c/Iva.:</Label>
                    <CurrencyInput
                        className="h-8"
                        value={financialData.gastosFinanciados.montoConIva}
                        disabled
                    />
                </div>
            </div>

            {/* Row 4: Pagos Posteriores */}
            <div className="space-y-3 rounded-lg border p-3">
                <h5 className="text-sm font-semibold text-primary">
                    Pagos Posteriores
                </h5>

                <div className="grid grid-cols-2 gap-4">
                    {/* Auto Sustituto Column */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="auto-sustituto"
                                checked={
                                    financialData.pagosPosteriores.autoSustituto
                                        .enabled
                                }
                                onCheckedChange={(checked) =>
                                    dispatch(
                                        setAutoSustitutoEnabled(
                                            checked as boolean,
                                        ),
                                    )
                                }
                            />
                            <Label
                                htmlFor="auto-sustituto"
                                className="cursor-pointer text-xs"
                            >
                                Auto Sustituto
                            </Label>
                        </div>

                        <div className="flex items-center gap-1">
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.autoSustituto
                                        .monto
                                }
                                onValueChange={(values) =>
                                    dispatch(
                                        updateFinancialDetails({
                                            pagosPosteriores: {
                                                ...financialData.pagosPosteriores,
                                                autoSustituto: {
                                                    ...financialData
                                                        .pagosPosteriores
                                                        .autoSustituto,
                                                    monto:
                                                        values.floatValue || 0,
                                                },
                                            },
                                        }),
                                    )
                                }
                                className="h-7 flex-1 text-xs"
                                disabled={
                                    !financialData.pagosPosteriores
                                        .autoSustituto.enabled
                                }
                            />
                            <NumberInput
                                value={
                                    financialData.pagosPosteriores.autoSustituto
                                        .porcentaje
                                }
                                onValueChange={(values) =>
                                    dispatch(
                                        updateFinancialDetails({
                                            pagosPosteriores: {
                                                ...financialData.pagosPosteriores,
                                                autoSustituto: {
                                                    ...financialData
                                                        .pagosPosteriores
                                                        .autoSustituto,
                                                    porcentaje:
                                                        values.floatValue || 0,
                                                },
                                            },
                                        }),
                                    )
                                }
                                decimalScale={4}
                                className="h-7 w-20 text-xs"
                                disabled={
                                    !financialData.pagosPosteriores
                                        .autoSustituto.enabled
                                }
                            />
                            <span className="text-xs">%</span>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Monto:</Label>
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.autoSustituto
                                        .calculado.monto
                                }
                                className="h-7 text-xs"
                                disabled
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">I.V.A.:</Label>
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.autoSustituto
                                        .calculado.iva
                                }
                                className="h-7 text-xs"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Seguro Crédito Column */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="seguro-credito"
                                checked={
                                    financialData.pagosPosteriores.seguroCredito
                                        .enabled
                                }
                                onCheckedChange={(checked) =>
                                    dispatch(
                                        setSeguroCreditoEnabled(
                                            checked as boolean,
                                        ),
                                    )
                                }
                            />
                            <Label
                                htmlFor="seguro-credito"
                                className="cursor-pointer text-xs"
                            >
                                Seguro Crédito
                            </Label>
                        </div>

                        <div className="flex items-center gap-1">
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.seguroCredito
                                        .monto
                                }
                                onValueChange={(values) =>
                                    dispatch(
                                        updateFinancialDetails({
                                            pagosPosteriores: {
                                                ...financialData.pagosPosteriores,
                                                seguroCredito: {
                                                    ...financialData
                                                        .pagosPosteriores
                                                        .seguroCredito,
                                                    monto:
                                                        values.floatValue || 0,
                                                },
                                            },
                                        }),
                                    )
                                }
                                className="h-7 flex-1 text-xs"
                                disabled={
                                    !financialData.pagosPosteriores
                                        .seguroCredito.enabled
                                }
                            />
                            <NumberInput
                                value={
                                    financialData.pagosPosteriores.seguroCredito
                                        .porcentaje
                                }
                                onValueChange={(values) =>
                                    dispatch(
                                        updateFinancialDetails({
                                            pagosPosteriores: {
                                                ...financialData.pagosPosteriores,
                                                seguroCredito: {
                                                    ...financialData
                                                        .pagosPosteriores
                                                        .seguroCredito,
                                                    porcentaje:
                                                        values.floatValue || 0,
                                                },
                                            },
                                        }),
                                    )
                                }
                                decimalScale={4}
                                className="h-7 w-20 text-xs"
                                disabled={
                                    !financialData.pagosPosteriores
                                        .seguroCredito.enabled
                                }
                            />
                            <span className="text-xs">%</span>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">Monto:</Label>
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.seguroCredito
                                        .calculado.monto
                                }
                                className="h-7 text-xs"
                                disabled
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs">I.V.A.:</Label>
                            <CurrencyInput
                                value={
                                    financialData.pagosPosteriores.seguroCredito
                                        .calculado.iva
                                }
                                className="h-7 text-xs"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 5: Fechas */}
            <div className="space-y-3 rounded-lg border p-3">
                <h5 className="text-sm font-semibold text-primary">Fechas:</h5>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Fecha Primer Pago:</Label>
                    <Input
                        type="date"
                        value={financialData.fechas.primerPago}
                        onChange={(e) =>
                            dispatch(
                                updateFinancialDetails({
                                    fechas: {
                                        ...financialData.fechas,
                                        primerPago: e.target.value,
                                    },
                                }),
                            )
                        }
                        className="h-8"
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Fecha Firma Contrato:</Label>
                    <Input
                        type="date"
                        value={financialData.fechas.firmaContrato}
                        onChange={(e) =>
                            dispatch(
                                updateFinancialDetails({
                                    fechas: {
                                        ...financialData.fechas,
                                        firmaContrato: e.target.value,
                                    },
                                }),
                            )
                        }
                        className="h-8"
                    />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="text-xs">Fecha Vence Operación:</Label>
                    <Input type="date" disabled className="h-8 bg-muted" />
                </div>
            </div>

            {/* Full Width Row: Pagos Intermedios */}
            <div className="rounded-lg border p-3">
                <Tabs defaultValue="pagos-intermedios">
                    <TabsList>
                        <TabsTrigger value="pagos-intermedios">
                            Pagos Intermedios
                        </TabsTrigger>
                        <TabsTrigger value="conceptos-financiar">
                            Conceptos a Financiar
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pagos-intermedios">
                        <div className="rounded border">
                            <table className="w-full text-xs">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-2 py-1 text-left">
                                            Amortiza.
                                        </th>
                                        <th className="px-2 py-1 text-center">
                                            Total
                                        </th>
                                        <th className="px-2 py-1 text-center">
                                            Monto
                                        </th>
                                        <th className="px-2 py-1 text-center">
                                            I.V.A.
                                        </th>
                                        <th className="w-16 px-2 py-1 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagosIntermedios.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-4 text-center text-muted-foreground"
                                            >
                                                Sin registros
                                            </td>
                                        </tr>
                                    ) : (
                                        pagosIntermedios.map((pago) => (
                                            <tr
                                                key={pago.id}
                                                className="border-t"
                                            >
                                                <td className="px-2 py-1">
                                                    <Input
                                                        value={pago.amortiza}
                                                        onChange={(e) =>
                                                            handleUpdatePagoIntermedio(
                                                                pago.id,
                                                                'amortiza',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onBlur={() => {
                                                            if (
                                                                !pago.isValidated &&
                                                                pago.amortiza.trim() !==
                                                                    ''
                                                            ) {
                                                                handleValidatePagoIntermedio(
                                                                    pago.id,
                                                                );
                                                            }
                                                        }}
                                                        className="h-7 text-xs"
                                                        placeholder="Amortiza."
                                                        disabled={
                                                            pago.isValidated
                                                        }
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    <CurrencyInput
                                                        value={pago.total}
                                                        onValueChange={(
                                                            values,
                                                        ) =>
                                                            handleUpdatePagoIntermedio(
                                                                pago.id,
                                                                'total',
                                                                values.floatValue ||
                                                                    0,
                                                            )
                                                        }
                                                        className="h-7 text-xs"
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    <CurrencyInput
                                                        value={pago.monto}
                                                        onValueChange={(
                                                            values,
                                                        ) =>
                                                            handleUpdatePagoIntermedio(
                                                                pago.id,
                                                                'monto',
                                                                values.floatValue ||
                                                                    0,
                                                            )
                                                        }
                                                        className="h-7 text-xs"
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    <CurrencyInput
                                                        value={pago.iva}
                                                        onValueChange={(
                                                            values,
                                                        ) =>
                                                            handleUpdatePagoIntermedio(
                                                                pago.id,
                                                                'iva',
                                                                values.floatValue ||
                                                                    0,
                                                            )
                                                        }
                                                        className="h-7 text-xs"
                                                    />
                                                </td>
                                                <td className="px-2 py-1 text-center">
                                                    {pago.isValidated ? (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                                            onClick={() =>
                                                                handleRemovePagoIntermedio(
                                                                    pago.id,
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-7 w-7 p-0 text-green-600 hover:text-green-700"
                                                            onClick={() =>
                                                                handleValidatePagoIntermedio(
                                                                    pago.id,
                                                                )
                                                            }
                                                        >
                                                            ✓
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-2 flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={handleAddPagoIntermedio}
                            >
                                Agregar
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="conceptos-financiar">
                        <div className="pointer-events-none rounded border opacity-60">
                            <table className="w-full text-xs">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-2 py-1 text-left">
                                            Num.
                                        </th>
                                        <th className="px-2 py-1 text-left">
                                            Fecha
                                        </th>
                                        <th className="px-2 py-1 text-left">
                                            Concepto
                                        </th>
                                        <th className="px-2 py-1 text-center">
                                            Monto
                                        </th>
                                        <th className="px-2 py-1 text-left">
                                            Clave Concepto
                                        </th>
                                        <th className="px-2 py-1 text-left">
                                            Tipo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-t">
                                        <td className="px-2 py-1">1</td>
                                        <td className="px-2 py-1">
                                            2025-10-30
                                        </td>
                                        <td className="px-2 py-1">BIEN</td>
                                        <td className="px-2 py-1 text-right">
                                            $4,310.34
                                        </td>
                                        <td className="px-2 py-1">50</td>
                                        <td className="px-2 py-1">1</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-2 py-1">2</td>
                                        <td className="px-2 py-1">
                                            2025-10-30
                                        </td>
                                        <td className="px-2 py-1">IVA BIEN</td>
                                        <td className="px-2 py-1 text-right">
                                            $689.66
                                        </td>
                                        <td className="px-2 py-1">37</td>
                                        <td className="px-2 py-1">0</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-2 py-1">3</td>
                                        <td className="px-2 py-1">
                                            2025-10-30
                                        </td>
                                        <td className="px-2 py-1">
                                            ACCESORIOS
                                        </td>
                                        <td className="px-2 py-1 text-right">
                                            $1,293.10
                                        </td>
                                        <td className="px-2 py-1">223</td>
                                        <td className="px-2 py-1">1</td>
                                    </tr>
                                    <tr className="border-t-2 border-primary/20 bg-muted/50">
                                        <td
                                            colSpan={3}
                                            className="px-2 py-1 text-right font-semibold"
                                        >
                                            Total:
                                        </td>
                                        <td className="px-2 py-1 text-right font-semibold">
                                            $6,293.10
                                        </td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="pointer-events-none mt-2 flex gap-2 opacity-60">
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                disabled
                            >
                                Agregar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                disabled
                            >
                                Insertar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                disabled
                            >
                                Borrar
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
