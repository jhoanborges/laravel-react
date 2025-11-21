'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CurrencyInput } from '@/lib/currency-format'
import { NumberInput } from '@/lib/number-format'

interface FinancialDetailsProps {
  data?: {
    montoFinanciado: number
    pagoMensual: number
    iva: number
    autoSustituto: number
    seguroCredito: number
    opcionCompra: {
      porcentaje: number
      monto: number
      montoBase: number
      iva: number
    }
    gastosFinanciados: {
      montoConIva: number
      monto: number
      iva: number
    }
    pagosPosteriores: {
      autoSustituto: boolean
      seguroCredito: boolean
    }
    fechas: {
      primerPago: string
      firmaContrato: string
      venceOperacion: string
      captura: string
    }
    montoOlva: number
  }
  onChange?: (data: any) => void
}

const defaultData = {
  montoFinanciado: 4310.34,
  pagoMensual: 0,
  iva: 0,
  autoSustituto: 65,
  seguroCredito: 0,
  opcionCompra: {
    porcentaje: 2,
    monto: 100,
    montoBase: 86.21,
    iva: 13.79
  },
  gastosFinanciados: {
    montoConIva: 0,
    monto: 0,
    iva: 0
  },
  pagosPosteriores: {
    autoSustituto: true,
    seguroCredito: false
  },
  fechas: {
    captura: '2025-10-30',
    primerPago: '2025-10-30',
    firmaContrato: '2025-10-30',
    venceOperacion: ''
  },
  montoOlva: 0
}

interface PagoIntermedio {
  id: string
  amortiza: string
  total: number
  monto: number
  iva: number
  isValidated: boolean
}

export default function FinancialDetails({ data = defaultData, onChange }: FinancialDetailsProps) {
  const financialData = { ...defaultData, ...data }
  const [autoSustitutoChecked, setAutoSustitutoChecked] = useState(true)
  const [seguroCreditoChecked, setSeguroCreditoChecked] = useState(false)
  const [pagosIntermedios, setPagosIntermedios] = useState<PagoIntermedio[]>([])

  const addPagoIntermedio = () => {
    const newPago: PagoIntermedio = {
      id: Date.now().toString(),
      amortiza: '',
      total: 0,
      monto: 0,
      iva: 0,
      isValidated: false
    }
    setPagosIntermedios([...pagosIntermedios, newPago])
  }

  const removePagoIntermedio = (id: string) => {
    setPagosIntermedios(pagosIntermedios.filter(pago => pago.id !== id))
  }

  const updatePagoIntermedio = (id: string, field: keyof PagoIntermedio, value: string | number | boolean) => {
    setPagosIntermedios(pagosIntermedios.map(pago =>
      pago.id === id ? { ...pago, [field]: value } : pago
    ))
  }

  const validatePagoIntermedio = async (id: string) => {
    // TODO: Replace with actual API call when endpoint is ready
    // Simulating API validation - hardcoded to always pass
    const isValid = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 500)
    })

    if (isValid) {
      updatePagoIntermedio(id, 'isValidated', true)
    }
  }

  return (
    <div className="space-y-4">
      {/* Row 1: Fecha Captura + Monto Financiado */}
      <div className="space-y-4">
        {/* Fecha Captura */}
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Fecha Captura:</Label>
          <Input type="date" defaultValue={financialData.fechas.captura} className="h-8" />
        </div>

        {/* Monto Financiado */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm font-semibold text-primary">Monto Financiado</Label>
            <CurrencyInput value={financialData.montoFinanciado} className="h-8 font-bold" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs">Pago MENSUAL:</Label>
            <CurrencyInput value={financialData.pagoMensual} className="h-8" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs">I.V.A.:</Label>
            <CurrencyInput value={financialData.iva} className="h-8" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs">Auto Sustituto:</Label>
            <CurrencyInput value={financialData.autoSustituto} className="h-8" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs">Seguro Crédito:</Label>
            <CurrencyInput value={financialData.seguroCredito} className="h-8" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center border-t pt-2">
            <Label className="text-xs font-semibold">Total:</Label>
            <Input className="h-8" readOnly />
          </div>
        </div>
      </div>

      {/* Row 2: Opción Compra */}
      <div className="border rounded-lg p-3 space-y-3">
        <h5 className="text-sm font-semibold text-primary">Opción Compra</h5>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Opción Compra:</Label>
          <div className="flex items-center gap-2">
            <NumberInput value={financialData.opcionCompra.porcentaje} decimalScale={2} className="h-8 w-20" />
            <span className="text-xs">%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <div></div>
          <CurrencyInput value={financialData.opcionCompra.monto} className="h-8" />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Monto:</Label>
          <CurrencyInput value={financialData.opcionCompra.montoBase} className="h-8" readOnly />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">I.V.A.:</Label>
          <CurrencyInput value={financialData.opcionCompra.iva} className="h-8" readOnly />
        </div>
      </div>

      {/* Row 3: Gastos Financiados */}
      <div className="border rounded-lg p-3 space-y-3">
        <h5 className="text-sm font-semibold text-primary">Gastos Financiados:</h5>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Monto:</Label>
          <CurrencyInput value={financialData.gastosFinanciados.monto} className="h-8" />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">I.V.A.:</Label>
          <CurrencyInput value={financialData.gastosFinanciados.iva} className="h-8" disabled />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Monto c/Iva.:</Label>
          <CurrencyInput className="h-8" value={financialData.gastosFinanciados.montoConIva} disabled />
        </div>
      </div>

      {/* Row 4: Pagos Posteriores */}
      <div className="border rounded-lg p-3 space-y-3">
        <h5 className="text-sm font-semibold text-primary">Pagos Posteriores</h5>

        <div className="grid grid-cols-2 gap-4">
          {/* Auto Sustituto Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="auto-sustituto"
                checked={autoSustitutoChecked}
                onCheckedChange={(checked) => setAutoSustitutoChecked(checked === true)}
              />
              <Label htmlFor="auto-sustituto" className="text-xs cursor-pointer">Auto Sustituto</Label>
            </div>

            <div className="flex items-center gap-1">
              <CurrencyInput value={65} className="h-7 text-xs flex-1" disabled={!autoSustitutoChecked} />
              <NumberInput value={0.0007} decimalScale={4} className="h-7 w-20 text-xs" disabled={!autoSustitutoChecked} />
              <span className="text-xs">%</span>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Monto:</Label>
              <CurrencyInput value={56.04} className="h-7 text-xs" disabled />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">I.V.A.:</Label>
              <CurrencyInput value={8.96} className="h-7 text-xs" disabled />
            </div>
          </div>

          {/* Seguro Crédito Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="seguro-credito"
                checked={seguroCreditoChecked}
                onCheckedChange={(checked) => setSeguroCreditoChecked(checked === true)}
              />
              <Label htmlFor="seguro-credito" className="text-xs cursor-pointer">Seguro Crédito</Label>
            </div>

            <div className="flex items-center gap-1">
              <CurrencyInput value={0} className="h-7 text-xs flex-1" disabled={!seguroCreditoChecked} />
              <NumberInput value={0} decimalScale={4} className="h-7 w-20 text-xs" disabled={!seguroCreditoChecked} />
              <span className="text-xs">%</span>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Monto:</Label>
              <CurrencyInput value={0} className="h-7 text-xs" disabled />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">I.V.A.:</Label>
              <CurrencyInput value={0} className="h-7 text-xs" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Fechas */}
      <div className="border rounded-lg p-3 space-y-3">
        <h5 className="text-sm font-semibold text-primary">Fechas:</h5>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Fecha Primer Pago:</Label>
          <Input type="date" defaultValue={financialData.fechas.primerPago} className="h-8" />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Fecha Firma Contrato:</Label>
          <Input type="date" defaultValue={financialData.fechas.firmaContrato} className="h-8" />
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs">Fecha Vence Operación:</Label>
          <Input type="date" disabled className="h-8 bg-muted" />
        </div>
      </div>

      {/* Full Width Row: Pagos Intermedios */}
      <div className="border rounded-lg p-3">
        <Tabs defaultValue="pagos-intermedios">
          <TabsList>
            <TabsTrigger value="pagos-intermedios">Pagos Intermedios</TabsTrigger>
            <TabsTrigger value="conceptos-financiar">Conceptos a Financiar</TabsTrigger>
          </TabsList>

          <TabsContent value="pagos-intermedios">
            <div className="border rounded">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-2 py-1 text-left">Amortiza.</th>
                    <th className="px-2 py-1 text-center">Total</th>
                    <th className="px-2 py-1 text-center">Monto</th>
                    <th className="px-2 py-1 text-center">I.V.A.</th>
                    <th className="px-2 py-1 text-center w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {pagosIntermedios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted-foreground">
                        Sin registros
                      </td>
                    </tr>
                  ) : (
                    pagosIntermedios.map((pago) => (
                      <tr key={pago.id} className="border-t">
                        <td className="px-2 py-1">
                          <Input
                            value={pago.amortiza}
                            onChange={(e) => updatePagoIntermedio(pago.id, 'amortiza', e.target.value)}
                            onBlur={() => {
                              if (!pago.isValidated && pago.amortiza.trim() !== '') {
                                validatePagoIntermedio(pago.id)
                              }
                            }}
                            className="h-7 text-xs"
                            placeholder="Amortiza."
                            disabled={pago.isValidated}
                          />
                        </td>
                        <td className="px-2 py-1">
                          <CurrencyInput
                            value={pago.total}
                            onValueChange={(values) => updatePagoIntermedio(pago.id, 'total', values.floatValue || 0)}
                            className="h-7 text-xs"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <CurrencyInput
                            value={pago.monto}
                            onValueChange={(values) => updatePagoIntermedio(pago.id, 'monto', values.floatValue || 0)}
                            className="h-7 text-xs"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <CurrencyInput
                            value={pago.iva}
                            onValueChange={(values) => updatePagoIntermedio(pago.id, 'iva', values.floatValue || 0)}
                            className="h-7 text-xs"
                          />
                        </td>
                        <td className="px-2 py-1 text-center">
                          {pago.isValidated ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              onClick={() => removePagoIntermedio(pago.id)}
                            >
                              ×
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-green-600 hover:text-green-700"
                              onClick={() => validatePagoIntermedio(pago.id)}
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

            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={addPagoIntermedio}>
                Agregar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="conceptos-financiar">
            <div className="border rounded opacity-60 pointer-events-none">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-2 py-1 text-left">Num.</th>
                    <th className="px-2 py-1 text-left">Fecha</th>
                    <th className="px-2 py-1 text-left">Concepto</th>
                    <th className="px-2 py-1 text-center">Monto</th>
                    <th className="px-2 py-1 text-left">Clave Concepto</th>
                    <th className="px-2 py-1 text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-t">
                    <td className="px-2 py-1">1</td>
                    <td className="px-2 py-1">2025-10-30</td>
                    <td className="px-2 py-1">BIEN</td>
                    <td className="px-2 py-1 text-right">$4,310.34</td>
                    <td className="px-2 py-1">50</td>
                    <td className="px-2 py-1">1</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-2 py-1">2</td>
                    <td className="px-2 py-1">2025-10-30</td>
                    <td className="px-2 py-1">IVA BIEN</td>
                    <td className="px-2 py-1 text-right">$689.66</td>
                    <td className="px-2 py-1">37</td>
                    <td className="px-2 py-1">0</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-2 py-1">3</td>
                    <td className="px-2 py-1">2025-10-30</td>
                    <td className="px-2 py-1">ACCESORIOS</td>
                    <td className="px-2 py-1 text-right">$1,293.10</td>
                    <td className="px-2 py-1">223</td>
                    <td className="px-2 py-1">1</td>
                  </tr>
                  <tr className="border-t-2 border-primary/20 bg-muted/50">
                    <td colSpan={3} className="px-2 py-1 font-semibold text-right">Total:</td>
                    <td className="px-2 py-1 text-right font-semibold">$6,293.10</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-2 opacity-60 pointer-events-none">
              <Button size="sm" variant="outline" className="text-xs" disabled>Agregar</Button>
              <Button size="sm" variant="outline" className="text-xs" disabled>Insertar</Button>
              <Button size="sm" variant="outline" className="text-xs" disabled>Borrar</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
