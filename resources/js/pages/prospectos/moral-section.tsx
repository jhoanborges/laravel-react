'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useMoralData } from '@/hooks/useProspectos'

export function MoralSection() {
  const { moral, updateMoral } = useMoralData()

  return (
    <div className="space-y-4 rounded-lg bg-secondary/10 p-4">
      <h3 className="font-semibold text-primary border-b pb-2">Moral</h3>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            <span className="text-red-500">*</span> Razon Social
          </Label>
          <Input
            value={moral.socialReason}
            onChange={(e) => updateMoral({ socialReason: e.target.value})}
            placeholder="Ingrese la razón social"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            <span className="text-red-500">*</span> Tipo Sociedad
          </Label>
          <Input
            value={moral.societyType}
            onChange={(e) => updateMoral({ societyType: e.target.value})}
            placeholder="Tipo de sociedad"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Nº de Escritura</Label>
          <Input
            value={moral.registrationNumber}
            onChange={(e) => updateMoral({ registrationNumber: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Fecha</Label>
          <Input
            type="date"
            value={moral.registrationDate}
            onChange={(e) => updateMoral({ registrationDate: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Plaza</Label>
          <Input
            value={moral.registrationPlaza}
            onChange={(e) => updateMoral({ registrationPlaza: e.target.value})}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Nombre del Notario</Label>
          <Input
            value={moral.notaryName}
            onChange={(e) => updateMoral({ notaryName: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            <span className="text-red-500">*</span> Nacionalidad
          </Label>
          <Select value={moral.nationality} onValueChange={(value) => updateMoral({ nationality: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar nacionalidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mexicana">Mexicana</SelectItem>
              <SelectItem value="extranjera">Extranjera</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Nº Inscripcion RPC</Label>
          <Input
            value={moral.rfcInscription}
            onChange={(e) => updateMoral({ rfcInscription: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Fecha</Label>
          <Input
            type="date"
            value={moral.rfcInscriptionDate}
            onChange={(e) => updateMoral({ rfcInscriptionDate: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Plaza</Label>
          <Input
            value={moral.rfcInscriptionPlaza}
            onChange={(e) => updateMoral({ rfcInscriptionPlaza: e.target.value})}
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Número de Notario</Label>
          <Input
            value={moral.notaryNumber}
            onChange={(e) => updateMoral({ notaryNumber: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Fecha de Constitución</Label>
          <Input
            type="date"
            value={moral.constitutionDate}
            onChange={(e) => updateMoral({ constitutionDate: e.target.value})}
          />
        </div>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            <span className="text-red-500">*</span> Razon Social Fiscal
          </Label>
          <Input
            value={moral.socialReasonFiscal}
            onChange={(e) => updateMoral({ socialReasonFiscal: e.target.value})}
            placeholder="Ingrese la razón social fiscal"
          />
        </div>

        <div className="flex items-end">
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">Validar</Button>
        </div>
      </div>
    </div>
  )
}
