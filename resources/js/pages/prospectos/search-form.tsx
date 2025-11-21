'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchForm } from '@/hooks/useProspectos'

// Mock data for prospects - replace with actual data from backend
const mockProspects = [
  {
    value: 'solicines',
    label: 'SOLÍCINES',
    rfc: 'SOL123456-A1',
  },
  {
    value: 'acme-corp',
    label: 'ACME CORPORATION',
    rfc: 'ACM789012-B2',
  },
  {
    value: 'tech-solutions',
    label: 'TECH SOLUTIONS SA DE CV',
    rfc: 'TEC345678-C3',
  },
]

export function SearchForm() {
  const { open, selectedProspect, setOpen, setSelectedProspect } = useSearchForm()

  const handleProspectSelect = (prospectValue: string) => {
    setSelectedProspect(prospectValue)
    setOpen(false)
    // Add logic here to load prospect data
  }

  return (
    <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
      <Label className="text-sm font-semibold">Búsqueda</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedProspect
                ? mockProspects.find((prospect) => prospect.value === selectedProspect)?.label
                : "Seleccionar prospecto..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Buscar prospecto..." />
              <CommandList>
                <CommandEmpty>No se encontró prospecto.</CommandEmpty>
                <CommandGroup>
                  {mockProspects.map((prospect) => (
                    <CommandItem
                      key={prospect.value}
                      value={prospect.value}
                      onSelect={handleProspectSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedProspect === prospect.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{prospect.label}</span>
                        <span className="text-xs text-muted-foreground">{prospect.rfc}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button className="bg-slate-600 hover:bg-slate-700">Buscar</Button>
      </div>
    </div>
  )
}
