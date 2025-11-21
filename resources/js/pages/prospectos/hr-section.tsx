'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { useHRSection } from '@/hooks/useProspectos'

export function HRSection() {
  const { records, addRecord, deleteRecord } = useHRSection()
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    cliente: '',
    consecutivo: '0',
    periodo: '',
    inicioDependent: '',
    inicioNoDependent: '',
    finDependent: '',
    finNoDependent: '',
  })

  const handleAddRecord = () => {
    if (formData.periodo) {
      addRecord({
        periodo: formData.periodo,
        inicioDependent: formData.inicioDependent,
        inicioNoDependent: formData.inicioNoDependent,
        finDependent: formData.finDependent,
        finNoDependent: formData.finNoDependent,
      })
      setFormData({
        cliente: '',
        consecutivo: '0',
        periodo: '',
        inicioDependent: '',
        inicioNoDependent: '',
        finDependent: '',
        finNoDependent: '',
      })
      setOpenModal(false)
    }
  }

  const handleDeleteRecord = (id: string) => {
    deleteRecord(id)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-muted-foreground">Número Empleados</div>

      <div className="mb-4">
        <Button onClick={() => setOpenModal(true)}>Agregar</Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Periodo</TableHead>
              <TableHead className="text-center">Inicio del Ejercicio</TableHead>
              <TableHead className="w-24"></TableHead>
              <TableHead className="text-center">Fin del Ejercicio</TableHead>
              <TableHead className="w-24"></TableHead>
              <TableHead className="w-16">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay registros. Haga clic en "Agregar" para añadir uno.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record, idx) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.periodo}</TableCell>
                  <TableCell className="text-center text-sm">Dependiente</TableCell>
                  <TableCell>{record.inicioDependent}</TableCell>
                  <TableCell className="text-center text-sm">Dependiente</TableCell>
                  <TableCell>{record.finDependent}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Captura de Número de Empleados</DialogTitle>
            <DialogDescription>
              Ingrese los datos del número de empleados.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="consecutivo">Consecutivo</Label>
                <Input
                  id="consecutivo"
                  value={formData.consecutivo}
                  disabled
                />
              </div>
            </div>

            <div>
              <Label htmlFor="periodo">Periodo</Label>
              <Input
                id="periodo"
                value={formData.periodo}
                onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                placeholder="Ej: 2024"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Inicio del Ejercicio</Label>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="inicioDependent" className="text-sm">Dependiente</Label>
                    <Input
                      id="inicioDependent"
                      value={formData.inicioDependent}
                      onChange={(e) => setFormData({ ...formData, inicioDependent: e.target.value })}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inicioNoDependent" className="text-sm">No Dependiente</Label>
                    <Input
                      id="inicioNoDependent"
                      value={formData.inicioNoDependent}
                      onChange={(e) => setFormData({ ...formData, inicioNoDependent: e.target.value })}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Fin del Ejercicio</Label>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="finDependent" className="text-sm">Dependiente</Label>
                    <Input
                      id="finDependent"
                      value={formData.finDependent}
                      onChange={(e) => setFormData({ ...formData, finDependent: e.target.value })}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="finNoDependent" className="text-sm">No Dependiente</Label>
                    <Input
                      id="finNoDependent"
                      value={formData.finNoDependent}
                      onChange={(e) => setFormData({ ...formData, finNoDependent: e.target.value })}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddRecord}>Aceptar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
