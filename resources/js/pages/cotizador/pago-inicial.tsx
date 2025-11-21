'use client';

import { Label } from '@/components/ui/label';
import { CurrencyInput } from '@/lib/currency-format';
import { NumberInput } from '@/lib/number-format';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updatePagoInicial } from '@/redux/slices';
import { useMemo } from 'react';

export default function PagoInicial() {
    const dispatch = useAppDispatch();
    const pagoInicialData = useAppSelector(
        (state) => state.cotizador.form.pagoInicial,
    );

    // Calculate totals
    const totalPagoInicial = useMemo(() => {
        return {
            total:
                pagoInicialData.capitalInicial.total +
                pagoInicialData.comisionApertura.total +
                pagoInicialData.gastosAdmin.total +
                pagoInicialData.otrosGastos.total +
                pagoInicialData.montoSeguro.total +
                pagoInicialData.rentasDeposito.total +
                pagoInicialData.interesDiasGracia.total,
            monto:
                pagoInicialData.capitalInicial.monto +
                pagoInicialData.comisionApertura.monto +
                pagoInicialData.gastosAdmin.monto +
                pagoInicialData.otrosGastos.monto +
                pagoInicialData.montoSeguro.monto +
                pagoInicialData.rentasDeposito.monto +
                pagoInicialData.interesDiasGracia.monto,
            iva:
                pagoInicialData.capitalInicial.iva +
                pagoInicialData.comisionApertura.iva +
                pagoInicialData.gastosAdmin.iva +
                pagoInicialData.otrosGastos.iva +
                pagoInicialData.montoSeguro.iva +
                pagoInicialData.rentasDeposito.iva +
                pagoInicialData.interesDiasGracia.iva,
        };
    }, [pagoInicialData]);

    return (
        <div className="space-y-3 rounded-lg border bg-white p-4">
            <h5 className="text-xs font-semibold text-primary">Pago Inicial</h5>

            <div className="flex items-center gap-2 text-sm">
                <Label className="text-sm whitespace-nowrap">
                    Total Pago Inicial:
                </Label>
                <NumberInput
                    value={pagoInicialData.totalPagoInicial.porcentaje}
                    onValueChange={(values) =>
                        dispatch(
                            updatePagoInicial({
                                totalPagoInicial: {
                                    ...pagoInicialData.totalPagoInicial,
                                    porcentaje: values.floatValue || 0,
                                },
                            }),
                        )
                    }
                    className="h-9 w-24"
                />
                <span className="text-sm">%</span>
                <CurrencyInput
                    value={pagoInicialData.totalPagoInicial.monto}
                    onValueChange={(values) =>
                        dispatch(
                            updatePagoInicial({
                                totalPagoInicial: {
                                    ...pagoInicialData.totalPagoInicial,
                                    monto: values.floatValue || 0,
                                },
                            }),
                        )
                    }
                    className="h-9 flex-1"
                />
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium"></th>
                            <th className="px-3 py-2 text-center font-medium">
                                TOTAL
                            </th>
                            <th className="px-3 py-2 text-center font-medium">
                                MONTO
                            </th>
                            <th className="px-3 py-2 text-center font-medium">
                                I.V.A.
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {/* Capital Inicial */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Capital Inicial</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.total}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.monto}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Comisión Apertura */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Comisión Apertura</td>
                            <td className="px-3 py-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <CurrencyInput
                                            suffix=" %"
                                            value={
                                                pagoInicialData.comisionApertura
                                                    .porcentaje
                                            }
                                            onValueChange={(values) =>
                                                dispatch(
                                                    updatePagoInicial({
                                                        comisionApertura: {
                                                            ...pagoInicialData.comisionApertura,
                                                            porcentaje:
                                                                values.floatValue ||
                                                                0,
                                                        },
                                                    }),
                                                )
                                            }
                                            className="h-8 text-right"
                                        />
                                    </div>
                                    <div>
                                        <CurrencyInput
                                            value={
                                                pagoInicialData.comisionApertura
                                                    .monto
                                            }
                                            onValueChange={(values) =>
                                                dispatch(
                                                    updatePagoInicial({
                                                        comisionApertura: {
                                                            ...pagoInicialData.comisionApertura,
                                                            monto:
                                                                values.floatValue ||
                                                                0,
                                                        },
                                                    }),
                                                )
                                            }
                                            className="h-8 text-right"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={
                                        pagoInicialData.comisionApertura.monto
                                    }
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.comisionApertura.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Gastos Admin */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Gastos Admin</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.gastosAdmin.total}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.gastosAdmin.monto}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.gastosAdmin.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Otros Gastos */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Otros Gastos</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.otrosGastos.total}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updatePagoInicial({
                                                otrosGastos: {
                                                    ...pagoInicialData.otrosGastos,
                                                    total:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.otrosGastos.monto}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updatePagoInicial({
                                                otrosGastos: {
                                                    ...pagoInicialData.otrosGastos,
                                                    monto:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.otrosGastos.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Monto Seguro */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Monto Seguro</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.montoSeguro.total}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updatePagoInicial({
                                                montoSeguro: {
                                                    ...pagoInicialData.montoSeguro,
                                                    total:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.montoSeguro.monto}
                                    onValueChange={(values) =>
                                        dispatch(
                                            updatePagoInicial({
                                                montoSeguro: {
                                                    ...pagoInicialData.montoSeguro,
                                                    monto:
                                                        values.floatValue || 0,
                                                },
                                            }),
                                        )
                                    }
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.montoSeguro.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Rentas en Depósito */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Rentas en Depósito</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.rentasDeposito.total}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.rentasDeposito.monto}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.rentasDeposito.iva}
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Interés Días Gracia */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Interés Días Gracia</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={
                                        pagoInicialData.interesDiasGracia.total
                                    }
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={
                                        pagoInicialData.interesDiasGracia.monto
                                    }
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={
                                        pagoInicialData.interesDiasGracia.iva
                                    }
                                    className="h-8 bg-muted text-right"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Total Pago Inicial */}
                        <tr className="border-t-2 border-primary/20 bg-muted/50">
                            <td className="px-3 py-2 font-semibold">
                                Total Pago Inicial:
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.total}
                                    className="h-8 bg-muted text-right font-semibold"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.monto}
                                    className="h-8 bg-muted text-right font-semibold"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.iva}
                                    className="h-8 bg-muted text-right font-semibold"
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
