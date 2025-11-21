'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useActiveTab, usePersonType } from '@/hooks/useProspectos';
import { AddressSection } from './address-section';
import { ContactSection } from './contact-section';
import { ContactsTable } from './contacts-table';
import { ExternalEntitiesSection } from './external-entities-section';
import { FisicaSection } from './fisica-section';
import { HRSection } from './hr-section';
import { MoralSection } from './moral-section';
import { PersonalInfoSection } from './personal-info-section';

export function BusinessForm() {
    const { activeTab, setActiveTab } = useActiveTab();
    const { personType } = usePersonType();

    return (
        <div className="w-full space-y-4 p-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="inline-flex h-auto w-full flex-wrap items-center justify-start gap-1 rounded-md bg-muted p-1 text-muted-foreground">
                    <TabsTrigger value="prospect" className="flex-shrink-0">
                        Prospecto
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="address"
                        className="flex-shrink-0"
                    >
                        Dirección
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="contacts"
                        className="flex-shrink-0"
                    >
                        Contactos
                    </TabsTrigger>
                    <TabsTrigger disabled value="hr" className="flex-shrink-0">
                        Recursos Humanos
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="external"
                        className="flex-shrink-0"
                    >
                        Datos Entidades
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="documents"
                        className="flex-shrink-0"
                    >
                        Documentos
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="transaction"
                        className="flex-shrink-0"
                    >
                        Perfil Transaccional
                    </TabsTrigger>
                    <TabsTrigger
                        disabled
                        value="property"
                        className="flex-shrink-0"
                    >
                        Propietario Real
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="prospect" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Prospecto</CardTitle>
                            <CardDescription>
                                Ingrese los datos del prospecto. Haga clic en
                                guardar cuando termine.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <PersonalInfoSection />
                            {personType === 'fisica' && <FisicaSection />}
                            {personType === 'moral' && <MoralSection />}
                            <ContactSection />
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button>Guardar cambios</Button>
                        <Button variant="outline">Cancelar</Button>
                    </div>
                </TabsContent>

                <TabsContent value="address" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dirección</CardTitle>
                            <CardDescription>
                                Gestione la información de dirección del
                                prospecto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <AddressSection />
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button>Guardar cambios</Button>
                        <Button variant="outline">Cancelar</Button>
                    </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contactos</CardTitle>
                            <CardDescription>
                                Administre los contactos asociados al prospecto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactsTable />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="hr" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recursos Humanos</CardTitle>
                            <CardDescription>
                                Datos relacionados con recursos humanos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HRSection />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="external" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Entidades Externas</CardTitle>
                            <CardDescription>
                                Información de entidades y referencias externas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ExternalEntitiesSection />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documentos</CardTitle>
                            <CardDescription>
                                Gestione los documentos del prospecto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de documentos
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="transaction" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfil Transaccional</CardTitle>
                            <CardDescription>
                                Información sobre el perfil transaccional del
                                prospecto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de perfil transaccional
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="property" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Propietario Real</CardTitle>
                            <CardDescription>
                                Datos del propietario real o beneficiario final.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="py-8 text-center text-muted-foreground">
                                Contenido de propietario real
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
