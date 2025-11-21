'use client'

import { Label } from '@/components/ui/label'
import { CurrencyInput } from '@/lib/currency-format'
import { NumberInput } from '@/lib/number-format'

interface PagoInicialData {
    totalPagoInicial: {
        porcentaje: number
        monto: number
    }
    capitalInicial: {
        total: number
        monto: number
        iva: number
    }
    comisionApertura: {
        porcentaje: number
        total: number
        monto: number
        iva: number
    }
    gastosAdmin: {
        total: number
        monto: number
        iva: number
    }
    otrosGastos: {
        total: number
        monto: number
        iva: number
    }
    montoSeguro: {
        total: number
        monto: number
        iva: number
    }
    rentasDeposito: {
        total: number
        monto: number
        iva: number
    }
    interesDiasGracia: {
        total: number
        monto: number
        iva: number
    }
}

interface PagoInicialProps {
    data?: Partial<PagoInicialData>
    onChange?: (data: PagoInicialData) => void
}

const defaultData: PagoInicialData = {
    totalPagoInicial: {
        porcentaje: 0,
        monto: 0
    },
    capitalInicial: {
        total: 0,
        monto: 0,
        iva: 0
    },
    comisionApertura: {
        porcentaje: 2.5,
        total: 15225.00,
        monto: 13125.00,
        iva: 2100.00
    },
    gastosAdmin: {
        total: 1500.00,
        monto: 1293.10,
        iva: 206.90
    },
    otrosGastos: {
        total: 0,
        monto: 0,
        iva: 0
    },
    montoSeguro: {
        total: 0,
        monto: 0,
        iva: 0
    },
    rentasDeposito: {
        total: 0,
        monto: 0,
        iva: 0
    },
    interesDiasGracia: {
        total: 0,
        monto: 0,
        iva: 0
    }
}

export default function PagoInicial({ data = defaultData, onChange }: PagoInicialProps) {
    const pagoInicialData = { ...defaultData, ...data }

    const totalPagoInicial = {
        total: pagoInicialData.capitalInicial.total +
            pagoInicialData.comisionApertura.total +
            pagoInicialData.gastosAdmin.total +
            pagoInicialData.otrosGastos.total +
            pagoInicialData.montoSeguro.total +
            pagoInicialData.rentasDeposito.total +
            pagoInicialData.interesDiasGracia.total,
        monto: pagoInicialData.capitalInicial.monto +
            pagoInicialData.comisionApertura.monto +
            pagoInicialData.gastosAdmin.monto +
            pagoInicialData.otrosGastos.monto +
            pagoInicialData.montoSeguro.monto +
            pagoInicialData.rentasDeposito.monto +
            pagoInicialData.interesDiasGracia.monto,
        iva: pagoInicialData.capitalInicial.iva +
            pagoInicialData.comisionApertura.iva +
            pagoInicialData.gastosAdmin.iva +
            pagoInicialData.otrosGastos.iva +
            pagoInicialData.montoSeguro.iva +
            pagoInicialData.rentasDeposito.iva +
            pagoInicialData.interesDiasGracia.iva
    }

    return (
        <div className="border rounded-lg p-4 space-y-3 bg-white">
            <h5 className="font-semibold text-xs text-primary">Pago Inicial</h5>


            <div className="flex items-center gap-2 text-sm">
                <Label className="text-sm whitespace-nowrap">Total Pago Inicial:</Label>
                <NumberInput
                    value={pagoInicialData.totalPagoInicial.porcentaje}
                    className="h-9 w-24"
                />
                <span className="text-sm">%</span>
                <CurrencyInput
                    value={pagoInicialData.totalPagoInicial.monto}
                    className="h-9 flex-1"
                />
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium"></th>
                            <th className="px-3 py-2 text-center font-medium">TOTAL</th>
                            <th className="px-3 py-2 text-center font-medium">MONTO</th>
                            <th className="px-3 py-2 text-center font-medium">I.V.A.</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {/* Capital Inicial */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Capital Inicial</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.total}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.monto}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.capitalInicial.iva}
                                    className="h-8 text-right bg-muted"
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
                                            value={pagoInicialData.comisionApertura.porcentaje}
                                            className="h-8 text-right"
                                    />
                                    </div>
                                    <div>
                                        <CurrencyInput
                                            value={pagoInicialData.comisionApertura.monto}
                                            className="h-8 text-right"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.comisionApertura.monto}
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.comisionApertura.iva}
                                    className="h-8 text-right bg-muted"
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
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.gastosAdmin.monto}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.gastosAdmin.iva}
                                    className="h-8 text-right bg-muted"
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
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.otrosGastos.monto}
                                    className="h-8 text-right"

                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.otrosGastos.iva}
                                    className="h-8 text-right bg-muted"
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
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.montoSeguro.monto}
                                    className="h-8 text-right"
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.montoSeguro.iva}
                                    className="h-8 text-right bg-muted"
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
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.rentasDeposito.monto}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.rentasDeposito.iva}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Interés Días Gracia */}
                        <tr className="border-t">
                            <td className="px-3 py-2">Interés Días Gracia</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.interesDiasGracia.total}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.interesDiasGracia.monto}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={pagoInicialData.interesDiasGracia.iva}
                                    className="h-8 text-right bg-muted"
                                    readOnly
                                />
                            </td>
                        </tr>

                        {/* Total Pago Inicial */}
                        <tr className="border-t-2 border-primary/20 bg-muted/50">
                            <td className="px-3 py-2 font-semibold">Total Pago Inicial:</td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.total}
                                    className="h-8 text-right font-semibold bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.monto}
                                    className="h-8 text-right font-semibold bg-muted"
                                    readOnly
                                />
                            </td>
                            <td className="px-3 py-2">
                                <CurrencyInput
                                    value={totalPagoInicial.iva}
                                    className="h-8 text-right font-semibold bg-muted"
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
