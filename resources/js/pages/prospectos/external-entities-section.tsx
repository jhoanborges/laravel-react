'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExternalEntities } from '@/hooks/useProspectos';
import { Trash2 } from 'lucide-react';

export function ExternalEntitiesSection() {
    const {
        nafinsa,
        updateNafinsa,
        cnbv,
        updateCnbv,
        banxico,
        updateBanxico,
        buroCreditos,
        addBuroRecord,
        updateBuroRecord,
        deleteBuroRecord,
        infonavitRecords,
        addInfonavitRecord,
        updateInfonavitRecord,
        deleteInfonavitRecord,
    } = useExternalEntities();

    return (
        <Tabs defaultValue="nafinsa" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="nafinsa">NAFINSA</TabsTrigger>
                <TabsTrigger value="buro">Buro de Crédito</TabsTrigger>
                <TabsTrigger value="cnbv">CNBV</TabsTrigger>
                <TabsTrigger value="banxico">Banxico</TabsTrigger>
                <TabsTrigger value="infonavit">Infonavit</TabsTrigger>
            </TabsList>

            <TabsContent value="nafinsa" className="space-y-6 py-4">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="strato-empresa">Estrato Empresa</Label>
                        <Input
                            id="strato-empresa"
                            placeholder="Ingrese el estrato de empresa"
                            value={nafinsa.stratoEmpresa}
                            onChange={(e) =>
                                updateNafinsa({ stratoEmpresa: e.target.value })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Input
                            id="sector"
                            placeholder="Ingrese el sector"
                            value={nafinsa.sector}
                            onChange={(e) =>
                                updateNafinsa({ sector: e.target.value })
                            }
                        />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="buro" className="space-y-6 py-4">
                <div className="space-y-4">
                    <Button
                        onClick={addBuroRecord}
                        className="bg-primary text-primary-foreground"
                    >
                        Agregar
                    </Button>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        No.
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Fecha Consulta Buro
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Folio Consulta Buro
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Clave Consulta Buro
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Fecha Captura
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Usuario Captura
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Maquina Captura
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Saldo
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Score
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Vencida
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Cartera Vencida
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {buroCreditos.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="border px-3 py-8 text-center text-muted-foreground"
                                        >
                                            No hay registros. Haga clic en
                                            "Agregar" para añadir uno.
                                        </td>
                                    </tr>
                                ) : (
                                    buroCreditos.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="hover:bg-secondary/30"
                                        >
                                            <td className="border px-3 py-2 text-sm">
                                                {record.no}
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    type="date"
                                                    value={
                                                        record.fechaConsultaBuro
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'fechaConsultaBuro',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={
                                                        record.folioConsultaBuro
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'folioConsultaBuro',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={
                                                        record.claveConsultaBuro
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'claveConsultaBuro',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    type="date"
                                                    value={record.fechaCaptura}
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'fechaCaptura',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={
                                                        record.usuarioCaptura
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'usuarioCaptura',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={
                                                        record.maquinaCaptura
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'maquinaCaptura',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={record.saldo}
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'saldo',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={record.score}
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'score',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={record.vencida}
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'vencida',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={
                                                        record.carteraVencida
                                                    }
                                                    onChange={(e) =>
                                                        updateBuroRecord(
                                                            record.id,
                                                            'carteraVencida',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <button
                                                    onClick={() =>
                                                        deleteBuroRecord(
                                                            record.id,
                                                        )
                                                    }
                                                    className="text-red-500 transition-colors hover:text-red-700"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="cnbv" className="space-y-6 py-4">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="tipo-cliente">
                            Tipo Cliente Relacionado
                        </Label>
                        <select
                            id="tipo-cliente"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={cnbv.tipoClienteRelacionado}
                            onChange={(e) =>
                                updateCnbv({
                                    tipoClienteRelacionado: e.target.value,
                                })
                            }
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="persona-no-relacionada">
                                Persona No Relacionada
                            </option>
                            <option value="persona-relacionada-relevante">
                                Persona Relacionada Relevante
                            </option>
                            <option value="persona-relacionada-no-relevante">
                                Persona Relacionada No Relevante
                            </option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="personalidad-juridica">
                            Personalidad Jurídica
                        </Label>
                        <select
                            id="personalidad-juridica"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={cnbv.personalidadJuridica}
                            onChange={(e) =>
                                updateCnbv({
                                    personalidadJuridica: e.target.value,
                                })
                            }
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="fisica">Persona Física</option>
                            <option value="moral">Persona Moral</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="es-fondo">Es Fondo</Label>
                        <select
                            id="es-fondo"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={cnbv.esFondo}
                            onChange={(e) =>
                                updateCnbv({ esFondo: e.target.value })
                            }
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="banxico" className="space-y-6 py-4">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="sector-economico">
                            Sector Económico
                        </Label>
                        <select
                            id="sector-economico"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={banxico.sectorEconomico}
                            onChange={(e) =>
                                updateBanxico({
                                    sectorEconomico: e.target.value,
                                })
                            }
                        >
                            <option value="">Seleccione un sector</option>
                            <option value="agricultura">Agricultura</option>
                            <option value="mineria">Minería</option>
                            <option value="manufactura">Manufactura</option>
                            <option value="energia">Energía</option>
                            <option value="construccion">Construcción</option>
                            <option value="comercio">Comercio</option>
                            <option value="transporte">Transporte</option>
                            <option value="comunicaciones">
                                Comunicaciones
                            </option>
                            <option value="servicios">Servicios</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="infonavit" className="space-y-6 py-4">
                <div className="space-y-4">
                    <Button
                        onClick={addInfonavitRecord}
                        className="bg-primary text-primary-foreground"
                    >
                        Agregar
                    </Button>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Periodo
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Pago Infonavit
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Dias Atraso
                                    </th>
                                    <th className="border px-3 py-2 text-left text-sm font-semibold">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {infonavitRecords.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="border px-3 py-8 text-center text-muted-foreground"
                                        >
                                            No hay registros. Haga clic en
                                            "Agregar" para añadir uno.
                                        </td>
                                    </tr>
                                ) : (
                                    infonavitRecords.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="hover:bg-secondary/30"
                                        >
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={record.periodo}
                                                    onChange={(e) =>
                                                        updateInfonavitRecord(
                                                            record.id,
                                                            'periodo',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                    placeholder="Periodo"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    value={record.pagoInfonavit}
                                                    onChange={(e) =>
                                                        updateInfonavitRecord(
                                                            record.id,
                                                            'pagoInfonavit',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                    placeholder="Pago"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <Input
                                                    type="number"
                                                    value={record.diasAtraso}
                                                    onChange={(e) =>
                                                        updateInfonavitRecord(
                                                            record.id,
                                                            'diasAtraso',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-8"
                                                    placeholder="Días"
                                                />
                                            </td>
                                            <td className="border px-3 py-2 text-sm">
                                                <button
                                                    onClick={() =>
                                                        deleteInfonavitRecord(
                                                            record.id,
                                                        )
                                                    }
                                                    className="text-red-500 transition-colors hover:text-red-700"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}
