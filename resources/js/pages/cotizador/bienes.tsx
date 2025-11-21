import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CurrencyInput } from '@/lib/currency-format'

interface BienesProps {
  onTotalsChange?: (totals: {
    bienTotal: number
    bienMonto: number
    bienIva: number
    accesoriosTotal: number
    accesoriosMonto: number
    accesoriosIva: number
  }) => void
}

export default function Bienes({ onTotalsChange }: BienesProps) {
  const [bienTotal, setBienTotal] = useState<number>(620000)
  const [bienMonto, setBienMonto] = useState<number>(540000)
  const [accesoriosMonto] = useState<number>(25000)
  const [accesoriosIva] = useState<number>(4000)

  const parseNumber = (value: number | string): number => {
    if (typeof value === 'number') return value
    const parsed = parseFloat(String(value).replace(/,/g, ''))
    return isNaN(parsed) ? 0 : parsed
  }

  const calculateBienIva = (): number => {
    return parseNumber(bienTotal) - parseNumber(bienMonto)
  }

  const calculateAccesoriosTotal = (): number => {
    return parseNumber(accesoriosMonto) + parseNumber(accesoriosIva)
  }

  const calculateTotalMonto = (): number => {
    return parseNumber(bienMonto) + parseNumber(accesoriosMonto)
  }

  const calculateTotalIva = (): number => {
    return calculateBienIva() + parseNumber(accesoriosIva)
  }

  const calculateGrandTotal = (): number => {
    return parseNumber(bienTotal) + calculateAccesoriosTotal()
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="font-semibold text-sm text-primary border-b pb-2">Bienes</h4>
      <div className="grid grid-cols-2 gap-2 items-end">

      <div className="space-y-2">
        <Label className="text-xs">Grupo:</Label>
        <Select defaultValue="muebles">
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
        <Select defaultValue="transporte">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transporte">Equipo de Transporte</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-2 items-end">

      <div className="space-y-2">
        <Label className="text-xs">Marca:</Label>
        <Select defaultValue="acura">
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
        <Select defaultValue="rdx">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rdx">RDX</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-2 items-end">
        <div>
          <Label className="text-xs">Año:</Label>
          <Select defaultValue="2025">
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center space-x-2 h-8">
          <Checkbox id="bien-nuevo" defaultChecked />
          <Label htmlFor="bien-nuevo" className="text-xs cursor-pointer">Bien Nuevo</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Descripción:</Label>
        <textarea
          className="w-full border rounded-md p-2 text-xs"
          rows={2}
          defaultValue="MARCA: ACURA, MODELO: RDX, AÑO: 2025"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Comentarios:</Label>
        <textarea
          className="w-full border rounded-md p-2 text-xs"
          rows={2}
          defaultValue="MARCA: ACURA, MODELO: RDX, AÑO: 2025"
        />
      </div>

      {/* Totals Table */}
      <div className="border-t pt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 text-xs font-semibold"></TableHead>
              <TableHead className="h-8 text-xs font-semibold text-center text-primary">TOTAL</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-center text-primary">MONTO</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-center text-primary">I.V.A.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs font-medium">Bien:</TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={bienTotal}
                  onValueChange={(values) => setBienTotal(values.floatValue || 0)}
                  className="h-7 text-right text-xs"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={bienMonto}
                  onValueChange={(values) => setBienMonto(values.floatValue || 0)}
                  className="h-7 text-right text-xs"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={calculateBienIva()}
                  readOnly
                  className="h-7 text-right text-xs bg-muted"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs font-medium">Accesorios:</TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={calculateAccesoriosTotal()}
                  readOnly
                  className="h-7 text-right text-xs bg-muted"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={accesoriosMonto}
                  readOnly
                  className="h-7 text-right text-xs bg-muted"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={accesoriosIva}
                  readOnly
                  className="h-7 text-right text-xs bg-muted"
                />
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell className="text-xs font-semibold">Total Bien+Acc:</TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={calculateGrandTotal()}
                  readOnly
                  className="h-7 text-right text-xs font-semibold bg-muted"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={calculateTotalMonto()}
                  readOnly
                  className="h-7 text-right text-xs font-semibold bg-muted"
                />
              </TableCell>
              <TableCell className="p-1">
                <CurrencyInput
                  value={calculateTotalIva()}
                  readOnly
                  className="h-7 text-right text-xs font-semibold bg-muted"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
