import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ===== Type Definitions =====

export interface ClientData {
    value: string;
    label: string;
    rfc: string;
    curp: string;
    personalidadFiscal: string;
    email: string;
    nacionalidad: string;
    fechaNacimiento: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    politicamenteExpuesto: string;
}

export interface PhoneData {
    tipo: 'OFICINA' | 'CASA' | 'FAX' | 'CELULAR';
    telefono: string;
}

export interface ContactData {
    contacto: string;
    tipoContacto: string;
}

export interface LineaData {
    linea: string;
    usarLineaExistente: boolean;
    fechas: {
        alta: string;
        vigencia: string;
    };
    comisionApertura: number;
    requiereGarantias: boolean;
    tipoTasa: string;
    tasaBase: string;
    tasaOrig: number;
    sobretasa: number;
    porcentaje: number;
    lineaAutorizada: number;
    lineaDispuesto: number;
    lineaDisponible: number;
}

export interface BienesData {
    grupo: string;
    tipo: string;
    marca: string;
    modelo: string;
    ano: string;
    bienNuevo: boolean;
    descripcion: string;
    comentarios: string;
    totales: {
        bien: {
            total: number;
            monto: number;
            iva: number;
        };
        accesorios: {
            total: number;
            monto: number;
            iva: number;
        };
    };
}

export interface PagoInicialData {
    totalPagoInicial: {
        porcentaje: number;
        monto: number;
    };
    capitalInicial: {
        total: number;
        monto: number;
        iva: number;
    };
    comisionApertura: {
        porcentaje: number;
        total: number;
        monto: number;
        iva: number;
    };
    gastosAdmin: {
        total: number;
        monto: number;
        iva: number;
    };
    otrosGastos: {
        total: number;
        monto: number;
        iva: number;
    };
    montoSeguro: {
        total: number;
        monto: number;
        iva: number;
    };
    rentasDeposito: {
        total: number;
        monto: number;
        iva: number;
    };
    interesDiasGracia: {
        total: number;
        monto: number;
        iva: number;
    };
}

export interface CriteriosData {
    amortizacionLineal: boolean;
    periodoPago: 'mensual' | 'bimestral' | 'trimestral' | 'semestral' | 'anual';
    rentasEnDeposito: number;
    numeroRentas: number;
    periodoGracia: string;
    tipoTasa: 'fija' | 'variable' | 'renta';
    seguroContratadoPor: string;
    tasaBase: 'tiie' | 'cetes' | 'cpp' | 'tiie-prom' | 'tiief-cxa';
    opcionSeguro: 'financiado' | 'contado';
    tasa: number;
    sobretasa: number;
    tasaTope: {
        enabled: boolean;
        tipo: 'cap' | 'no';
        valor: number;
    };
}

export interface PagoIntermedio {
    id: string;
    amortiza: string;
    total: number;
    monto: number;
    iva: number;
    isValidated: boolean;
}

export interface FinancialDetailsData {
    fechaCaptura: string;
    montoFinanciado: number;
    pagoMensual: number;
    iva: number;
    autoSustituto: number;
    seguroCredito: number;
    opcionCompra: {
        porcentaje: number;
        monto: number;
        montoBase: number;
        iva: number;
    };
    gastosFinanciados: {
        montoConIva: number;
        monto: number;
        iva: number;
    };
    pagosPosteriores: {
        autoSustituto: {
            enabled: boolean;
            monto: number;
            porcentaje: number;
            calculado: {
                monto: number;
                iva: number;
            };
        };
        seguroCredito: {
            enabled: boolean;
            monto: number;
            porcentaje: number;
            calculado: {
                monto: number;
                iva: number;
            };
        };
    };
    fechas: {
        primerPago: string;
        firmaContrato: string;
        venceOperacion: string;
    };
    pagosIntermedios: PagoIntermedio[];
    montoOlva: number;
}

export interface SolicitudCreditoData {
    condicionesSolCredito: string;
    descPorNomina: string;
}

export interface CotizadorState {
    ui: {
        activeMainTab: 'proyecto' | 'lineas' | 'operaciones' | 'cotizaciones';
        activeSubTab: 'arrendamiento' | 'tabla' | 'garantias';
        activeArrendamientoTab:
            | 'datos-generales'
            | 'tipos-garantias'
            | 'avales';
        clientSearchOpen: boolean;
    };
    form: {
        // Client Data
        selectedClient: string;
        clientData: ClientData | null;
        phones: PhoneData[];
        contacts: ContactData[];
        tipoArrendamiento:
            | 'arrendamiento-financiero'
            | 'credito-simple'
            | 'arrendamiento-puro'
            | 'prestamo-refaccionario'
            | 'credito-automotriz'
            | 'ap-prog-entrega';

        // Solicitud Crédito
        solicitudCredito: SolicitudCreditoData;

        // Cotización Details
        numeroCotizacion: string;
        ejecutivo: string;

        // Datos Generales de la Línea
        linea: LineaData;

        // Bienes
        bienes: BienesData;

        // Criterios
        criterios: CriteriosData;

        // Pago Inicial
        pagoInicial: PagoInicialData;

        // Financial Details
        financialDetails: FinancialDetailsData;
    };
}

// ===== Initial State =====

const initialState: CotizadorState = {
    ui: {
        activeMainTab: 'proyecto',
        activeSubTab: 'arrendamiento',
        activeArrendamientoTab: 'datos-generales',
        clientSearchOpen: false,
    },
    form: {
        selectedClient: '',
        clientData: null,
        phones: [],
        contacts: [],
        tipoArrendamiento: 'arrendamiento-financiero',

        solicitudCredito: {
            condicionesSolCredito: '',
            descPorNomina: '',
        },

        numeroCotizacion: '',
        ejecutivo: 'mayte',

        linea: {
            linea: '',
            usarLineaExistente: false,
            fechas: {
                alta: new Date().toISOString().split('T')[0],
                vigencia: new Date().toISOString().split('T')[0],
            },
            comisionApertura: 0,
            requiereGarantias: false,
            tipoTasa: 'variable',
            tasaBase: 'tiie',
            tasaOrig: 0,
            sobretasa: 0,
            porcentaje: 0,
            lineaAutorizada: 0,
            lineaDispuesto: 0,
            lineaDisponible: 0,
        },

        bienes: {
            grupo: 'muebles',
            tipo: 'transporte',
            marca: '',
            modelo: '',
            ano: '',
            bienNuevo: true,
            descripcion: '',
            comentarios: '',
            totales: {
                bien: {
                    total: 0,
                    monto: 0,
                    iva: 0,
                },
                accesorios: {
                    total: 0,
                    monto: 0,
                    iva: 0,
                },
            },
        },

        criterios: {
            amortizacionLineal: false,
            periodoPago: 'mensual',
            rentasEnDeposito: 1,
            numeroRentas: 24,
            periodoGracia: '',
            tipoTasa: 'fija',
            seguroContratadoPor: 'value',
            tasaBase: 'tiie',
            opcionSeguro: 'financiado',
            tasa: 8.0,
            sobretasa: 10.0,
            tasaTope: {
                enabled: false,
                tipo: 'cap',
                valor: 0,
            },
        },

        pagoInicial: {
            totalPagoInicial: {
                porcentaje: 0,
                monto: 0,
            },
            capitalInicial: {
                total: 0,
                monto: 0,
                iva: 0,
            },
            comisionApertura: {
                porcentaje: 2.5,
                total: 0,
                monto: 0,
                iva: 0,
            },
            gastosAdmin: {
                total: 0,
                monto: 0,
                iva: 0,
            },
            otrosGastos: {
                total: 0,
                monto: 0,
                iva: 0,
            },
            montoSeguro: {
                total: 0,
                monto: 0,
                iva: 0,
            },
            rentasDeposito: {
                total: 0,
                monto: 0,
                iva: 0,
            },
            interesDiasGracia: {
                total: 0,
                monto: 0,
                iva: 0,
            },
        },

        financialDetails: {
            fechaCaptura: new Date().toISOString().split('T')[0],
            montoFinanciado: 0,
            pagoMensual: 0,
            iva: 0,
            autoSustituto: 0,
            seguroCredito: 0,
            opcionCompra: {
                porcentaje: 2,
                monto: 0,
                montoBase: 0,
                iva: 0,
            },
            gastosFinanciados: {
                montoConIva: 0,
                monto: 0,
                iva: 0,
            },
            pagosPosteriores: {
                autoSustituto: {
                    enabled: true,
                    monto: 65,
                    porcentaje: 0.0007,
                    calculado: {
                        monto: 0,
                        iva: 0,
                    },
                },
                seguroCredito: {
                    enabled: false,
                    monto: 0,
                    porcentaje: 0,
                    calculado: {
                        monto: 0,
                        iva: 0,
                    },
                },
            },
            fechas: {
                primerPago: new Date().toISOString().split('T')[0],
                firmaContrato: new Date().toISOString().split('T')[0],
                venceOperacion: '',
            },
            pagosIntermedios: [],
            montoOlva: 0,
        },
    },
};

// ===== Slice =====

const cotizadorSlice = createSlice({
    name: 'cotizador',
    initialState,
    reducers: {
        // UI Actions
        setActiveMainTab: (
            state,
            action: PayloadAction<CotizadorState['ui']['activeMainTab']>,
        ) => {
            state.ui.activeMainTab = action.payload;
        },
        setActiveSubTab: (
            state,
            action: PayloadAction<CotizadorState['ui']['activeSubTab']>,
        ) => {
            state.ui.activeSubTab = action.payload;
        },
        setActiveArrendamientoTab: (
            state,
            action: PayloadAction<
                CotizadorState['ui']['activeArrendamientoTab']
            >,
        ) => {
            state.ui.activeArrendamientoTab = action.payload;
        },
        setClientSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.ui.clientSearchOpen = action.payload;
        },

        // Client Data Actions
        setSelectedClient: (state, action: PayloadAction<string>) => {
            state.form.selectedClient = action.payload;
        },
        setClientData: (state, action: PayloadAction<ClientData>) => {
            state.form.clientData = action.payload;
        },
        setPhones: (state, action: PayloadAction<PhoneData[]>) => {
            state.form.phones = action.payload;
        },
        addCotizadorContact: (state, action: PayloadAction<ContactData>) => {
            state.form.contacts.push(action.payload);
        },
        deleteCotizadorContact: (state, action: PayloadAction<number>) => {
            state.form.contacts.splice(action.payload, 1);
        },
        updateCotizadorContact: (
            state,
            action: PayloadAction<{ index: number; data: ContactData }>,
        ) => {
            state.form.contacts[action.payload.index] = action.payload.data;
        },
        setTipoArrendamiento: (
            state,
            action: PayloadAction<CotizadorState['form']['tipoArrendamiento']>,
        ) => {
            state.form.tipoArrendamiento = action.payload;
        },

        // Solicitud Crédito Actions
        updateSolicitudCredito: (
            state,
            action: PayloadAction<Partial<SolicitudCreditoData>>,
        ) => {
            state.form.solicitudCredito = {
                ...state.form.solicitudCredito,
                ...action.payload,
            };
        },

        // Línea Actions
        updateLinea: (state, action: PayloadAction<Partial<LineaData>>) => {
            state.form.linea = { ...state.form.linea, ...action.payload };
        },

        // Bienes Actions
        updateBienes: (state, action: PayloadAction<Partial<BienesData>>) => {
            state.form.bienes = { ...state.form.bienes, ...action.payload };
        },
        updateBienesTotales: (
            state,
            action: PayloadAction<Partial<BienesData['totales']>>,
        ) => {
            state.form.bienes.totales = {
                ...state.form.bienes.totales,
                ...action.payload,
            };
        },

        // Criterios Actions
        updateCriterios: (
            state,
            action: PayloadAction<Partial<CriteriosData>>,
        ) => {
            state.form.criterios = {
                ...state.form.criterios,
                ...action.payload,
            };
        },
        setTasaTopeEnabled: (state, action: PayloadAction<boolean>) => {
            state.form.criterios.tasaTope.enabled = action.payload;
        },

        // Pago Inicial Actions
        updatePagoInicial: (
            state,
            action: PayloadAction<Partial<PagoInicialData>>,
        ) => {
            state.form.pagoInicial = {
                ...state.form.pagoInicial,
                ...action.payload,
            };
        },

        // Financial Details Actions
        updateFinancialDetails: (
            state,
            action: PayloadAction<Partial<FinancialDetailsData>>,
        ) => {
            state.form.financialDetails = {
                ...state.form.financialDetails,
                ...action.payload,
            };
        },
        setAutoSustitutoEnabled: (state, action: PayloadAction<boolean>) => {
            state.form.financialDetails.pagosPosteriores.autoSustituto.enabled =
                action.payload;
        },
        setSeguroCreditoEnabled: (state, action: PayloadAction<boolean>) => {
            state.form.financialDetails.pagosPosteriores.seguroCredito.enabled =
                action.payload;
        },
        addPagoIntermedio: (state, action: PayloadAction<PagoIntermedio>) => {
            state.form.financialDetails.pagosIntermedios.push(action.payload);
        },
        updatePagoIntermedio: (
            state,
            action: PayloadAction<{
                id: string;
                data: Partial<PagoIntermedio>;
            }>,
        ) => {
            const index =
                state.form.financialDetails.pagosIntermedios.findIndex(
                    (p) => p.id === action.payload.id,
                );
            if (index !== -1) {
                state.form.financialDetails.pagosIntermedios[index] = {
                    ...state.form.financialDetails.pagosIntermedios[index],
                    ...action.payload.data,
                };
            }
        },
        removePagoIntermedio: (state, action: PayloadAction<string>) => {
            state.form.financialDetails.pagosIntermedios =
                state.form.financialDetails.pagosIntermedios.filter(
                    (p) => p.id !== action.payload,
                );
        },

        // Utility Actions
        resetCotizador: (state) => {
            state.form = initialState.form;
        },
        loadMockClient: (
            state,
            action: PayloadAction<{
                client: ClientData;
                phones: PhoneData[];
                contacts: ContactData[];
            }>,
        ) => {
            state.form.clientData = action.payload.client;
            state.form.phones = action.payload.phones;
            state.form.contacts = action.payload.contacts;
            state.form.selectedClient = action.payload.client.value;
        },
    },
});

// ===== Exports =====

export const {
    setActiveMainTab,
    setActiveSubTab,
    setActiveArrendamientoTab,
    setClientSearchOpen,
    setSelectedClient,
    setClientData,
    setPhones,
    addCotizadorContact,
    deleteCotizadorContact,
    updateCotizadorContact,
    setTipoArrendamiento,
    updateSolicitudCredito,
    updateLinea,
    updateBienes,
    updateBienesTotales,
    updateCriterios,
    setTasaTopeEnabled,
    updatePagoInicial,
    updateFinancialDetails,
    setAutoSustitutoEnabled,
    setSeguroCreditoEnabled,
    addPagoIntermedio,
    updatePagoIntermedio,
    removePagoIntermedio,
    resetCotizador,
    loadMockClient,
} = cotizadorSlice.actions;

export default cotizadorSlice.reducer;
